import React from 'react';
import { useNowPlaying } from '../hooks/useNowPlaying';

function ListeningTo() {
    const { status, data, error, refresh } = useNowPlaying();

    return (
        <div className="condiv">
            <p className="eyebrow">Side project</p>
            <h1 className="section-title">What I&apos;m Listening To</h1>
            <p className="section-intro">
                Pulled live from my Spotify account through a small serverless proxy that keeps my
                credentials off this site entirely &mdash; refreshes every 30 seconds.
            </p>

            {status === 'loading' && <p className="section-intro">Checking Spotify&hellip;</p>}

            {status === 'not-configured' && (
                <div className="pass-info-card">
                    <p>
                        This page isn&apos;t hooked up to Spotify on this deployment yet &mdash; it
                        needs an <code>/api/now-playing</code> serverless function with Spotify
                        credentials configured as environment variables.
                    </p>
                </div>
            )}

            {status === 'error' && (
                <div className="pass-info-card">
                    <p>Couldn&apos;t reach Spotify ({error}).</p>
                    <button type="button" className="refresh-btn" onClick={refresh}>
                        <i className="fas fa-rotate"></i> Try again
                    </button>
                </div>
            )}

            {status === 'ready' && data && !data.track && (
                <p className="section-intro">Nothing played recently.</p>
            )}

            {status === 'ready' && data && data.track && (
                <div className="now-playing-card">
                    {data.track.albumArt && (
                        <img
                            src={data.track.albumArt}
                            alt={`${data.track.album || data.track.name} cover art`}
                            className="now-playing-art"
                        />
                    )}
                    <div className="now-playing-info">
                        <span className="now-playing-status">
                            {data.isPlaying ? (
                                <>
                                    <span className="eq-bars" aria-hidden="true">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </span>
                                    Now playing
                                </>
                            ) : (
                                'Last played'
                            )}
                        </span>
                        <h3>{data.track.name}</h3>
                        <p>{data.track.artists}</p>
                        {data.track.album && <p className="now-playing-album">{data.track.album}</p>}
                        {data.track.url && (
                            <a
                                href={data.track.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="entry-link"
                            >
                                Open in Spotify <i className="fab fa-spotify"></i>
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListeningTo;
