// Firebase Cloud Function. Holds Spotify credentials server-side (as
// Firebase secrets - never committed, never sent to the client) and exposes
// a small public read-only "what's playing" endpoint at /api/now-playing
// (see the hosting rewrite in firebase.json).
//
// Required secrets (set with `firebase functions:secrets:set <NAME>`, not in
// this repo):
//   SPOTIFY_CLIENT_ID
//   SPOTIFY_CLIENT_SECRET
//   SPOTIFY_REFRESH_TOKEN   (see scripts/get-spotify-refresh-token.js)

const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');

const spotifyClientId = defineSecret('SPOTIFY_CLIENT_ID');
const spotifyClientSecret = defineSecret('SPOTIFY_CLIENT_SECRET');
const spotifyRefreshToken = defineSecret('SPOTIFY_REFRESH_TOKEN');

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

async function getAccessToken() {
    const clientId = spotifyClientId.value();
    const clientSecret = spotifyClientSecret.value();
    const refreshToken = spotifyRefreshToken.value();

    if (!clientId || !clientSecret || !refreshToken) {
        throw new Error('Spotify credentials are not configured on this deployment');
    }

    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await fetch(TOKEN_URL, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to refresh Spotify token (HTTP ${response.status})`);
    }

    const data = await response.json();
    return data.access_token;
}

function trackPayload(track, isPlaying, playedAt) {
    if (!track) {
        return { isPlaying: false, track: null };
    }
    return {
        isPlaying,
        playedAt: playedAt || null,
        track: {
            name: track.name,
            artists: (track.artists || []).map((a) => a.name).join(', '),
            album: track.album ? track.album.name : null,
            albumArt: track.album && track.album.images && track.album.images[0]
                ? track.album.images[0].url
                : null,
            url: track.external_urls ? track.external_urls.spotify : null,
        },
    };
}

exports.nowPlaying = onRequest(
    { secrets: [spotifyClientId, spotifyClientSecret, spotifyRefreshToken] },
    async (req, res) => {
        res.set('Cache-Control', 'public, max-age=0, s-maxage=30, stale-while-revalidate=59');

        try {
            const accessToken = await getAccessToken();

            const nowRes = await fetch(NOW_PLAYING_URL, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (nowRes.status === 200) {
                const nowData = await nowRes.json();
                if (nowData && nowData.item) {
                    res.status(200).json(trackPayload(nowData.item, nowData.is_playing, null));
                    return;
                }
            }

            // Nothing currently playing (204 No Content, or an empty payload) -
            // fall back to the most recently played track.
            const recentRes = await fetch(RECENTLY_PLAYED_URL, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (!recentRes.ok) {
                throw new Error(`Spotify recently-played request failed (HTTP ${recentRes.status})`);
            }

            const recentData = await recentRes.json();
            const mostRecent = recentData.items && recentData.items[0];

            if (!mostRecent) {
                res.status(200).json({ isPlaying: false, track: null });
                return;
            }

            res.status(200).json(trackPayload(mostRecent.track, false, mostRecent.played_at));
        } catch (err) {
            res.status(502).json({ error: err.message });
        }
    }
);
