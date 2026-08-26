/*
 * One-time helper: run this locally to authorize this app against your own
 * Spotify account and print a refresh token. Feed it into Firebase Functions
 * as a secret - never commit the printed token or your Client Secret to git:
 *
 *   firebase functions:secrets:set SPOTIFY_CLIENT_ID
 *   firebase functions:secrets:set SPOTIFY_CLIENT_SECRET
 *   firebase functions:secrets:set SPOTIFY_REFRESH_TOKEN   <- paste this script's output
 *
 * Before running, add this exact URI as a Redirect URI on your Spotify app
 * (developer.spotify.com/dashboard -> your app -> Settings):
 *   http://127.0.0.1:8888/callback
 *
 * Usage (from the "Portfolio_Website_React JS" directory):
 *   SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/get-spotify-refresh-token.js
 *
 * On Windows PowerShell:
 *   $env:SPOTIFY_CLIENT_ID="xxx"; $env:SPOTIFY_CLIENT_SECRET="yyy"; node scripts/get-spotify-refresh-token.js
 */

const http = require('http');
const { URL } = require('url');

const PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = ['user-read-currently-playing', 'user-read-recently-played'].join(' ');

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    console.error('Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET env vars first (see the comment at the top of this file).');
    process.exit(1);
}

const authorizeUrl = new URL('https://accounts.spotify.com/authorize');
authorizeUrl.searchParams.set('client_id', SPOTIFY_CLIENT_ID);
authorizeUrl.searchParams.set('response_type', 'code');
authorizeUrl.searchParams.set('redirect_uri', REDIRECT_URI);
authorizeUrl.searchParams.set('scope', SCOPES);

console.log('\n1. Open this URL, log in, and approve access:\n');
console.log(authorizeUrl.toString());
console.log(`\n2. Waiting for the redirect back to ${REDIRECT_URI} ...\n`);

const server = http.createServer((req, res) => {
    const url = new URL(req.url, REDIRECT_URI);
    if (url.pathname !== '/callback') {
        res.writeHead(404);
        res.end();
        return;
    }

    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');

    if (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end(`Spotify returned an error: ${error}`);
        console.error(`Spotify returned an error: ${error}`);
        server.close();
        process.exitCode = 1;
        return;
    }

    exchangeCodeForTokens(code)
        .then((data) => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Success! You can close this tab and go back to your terminal.');

            console.log('\nSuccess. Add this as SPOTIFY_REFRESH_TOKEN in your deployment env vars:\n');
            console.log(data.refresh_token);
            console.log('\n(This token is a secret - do not commit it or share it.)\n');
        })
        .catch((err) => {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Something went wrong - check your terminal.');
            console.error('Failed to exchange code for tokens:', err.message);
        })
        .finally(() => server.close());
});

async function exchangeCodeForTokens(code) {
    const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
        }),
    });

    const data = await tokenRes.json();

    if (!tokenRes.ok) {
        throw new Error(data.error_description || `HTTP ${tokenRes.status}`);
    }

    return data;
}

server.listen(PORT);
