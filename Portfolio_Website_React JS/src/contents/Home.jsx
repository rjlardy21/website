import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import profilepic from '../img/reece_photo.webp';
import profilepicFormal from '../img/reece_headshot.webp';
import bgVideo from '../img/bg.mp4';
import { useTypewriter } from '../hooks/useTypewriter';

const ROLES = ['Software Engineer', 'AI Application Developer', 'Full-Stack Developer'];

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function prefersReducedMotion() {
    return typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia(REDUCED_MOTION_QUERY).matches
        : false;
}

function Home() {
    const videoRef = useRef(null);
    const flipRef = useRef(null);
    const [reducedMotion] = useState(prefersReducedMotion);
    const [videoPaused, setVideoPaused] = useState(reducedMotion);
    const manualSide = useRef(null); // null = auto loop, else true when the back is showing
    const [flipTouched, setFlipTouched] = useState(false);
    const typedRole = useTypewriter(ROLES, { animate: !reducedMotion });

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (videoPaused) {
            video.pause();
        } else {
            const playing = video.play();
            if (playing && playing.catch) playing.catch(() => {});
        }
    }, [videoPaused]);

    // Dip the video to dark for a moment at each end of the clip so the loop
    // point is a soft fade instead of a visible jump.
    useEffect(() => {
        const video = videoRef.current;
        if (!video || videoPaused) return undefined;
        const FADE_SECONDS = 0.9;
        let frame;
        const tick = () => {
            const duration = video.duration;
            if (duration && Number.isFinite(duration)) {
                const edge = Math.min(video.currentTime, duration - video.currentTime);
                video.style.opacity = edge >= FADE_SECONDS ? '1' : String(Math.max(0, edge / FADE_SECONDS));
            }
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(frame);
            video.style.opacity = '1';
        };
    }, [videoPaused]);

    // Click/tap/Enter flips the photo by hand: freeze the auto animation on the
    // side currently showing, then rotate to the other side.
    const flipPhoto = () => {
        const el = flipRef.current;
        if (!el) return;
        setFlipTouched(true);
        let showingBack = manualSide.current;
        if (showingBack === null) {
            const current = window.getComputedStyle(el).transform;
            showingBack = current !== 'none' && parseFloat(current.split('(')[1]) < 0;
            el.style.animation = 'none';
            el.style.transition = 'none';
            el.style.transform = current;
            void el.offsetWidth; // commit the frozen frame before animating
        }
        el.style.transition = 'transform 0.7s ease-in-out';
        el.style.transform = showingBack ? 'rotateY(0deg)' : 'rotateY(180deg)';
        manualSide.current = !showingBack;
    };

    return (
        <div className="condiv home">
            <div className="hero-video-bg" aria-hidden="true">
                {!reducedMotion && (
                    <video
                        ref={videoRef}
                        className="hero-video"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                    >
                        <source src={bgVideo} type="video/mp4" />
                    </video>
                )}
                <div className="hero-video-overlay"></div>
            </div>
            <div className="hero-content">
                <div className="hero-text">
                    <h1 className="hero-name reveal" style={{ '--delay': '120ms' }}>
                        Reece Lardy
                    </h1>
                    <div className="hero-role reveal" style={{ '--delay': '220ms' }}>
                        <span className="sr-only">{ROLES.join(', ')}</span>
                        <span className="typingeffect" aria-hidden="true">
                            <span className="typed-text">{typedRole}</span>
                            <span className={`typed-cursor${reducedMotion ? ' is-static' : ''}`}></span>
                        </span>
                    </div>
                    <p className="hero-tagline reveal" style={{ '--delay': '320ms' }}>
                        Clean, maintainable software for ambiguous problems. Solid engineering
                        fundamentals plus modern AI development, turned into secure, scalable
                        products.
                    </p>
                    <div className="hero-actions reveal" style={{ '--delay': '440ms' }}>
                        <a
                            className="btn btn-primary btn-lg"
                            href="/Reece_Lardy_Resume.pdf"
                            download="Reece_Lardy_Resume.pdf"
                        >
                            <i className="fas fa-download"></i> Download resume
                        </a>
                        <Link className="btn btn-secondary" to="/contact">
                            Get in touch
                        </Link>
                        <a
                            className="btn btn-secondary"
                            href="https://github.com/rjlardy21"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-github"></i> View GitHub
                        </a>
                    </div>
                </div>
                <div className="hero-photo reveal" style={{ '--delay': '0ms' }}>
                    <button
                        type="button"
                        className={`profilepic-flip${flipTouched ? ' is-touched' : ''}`}
                        onClick={flipPhoto}
                        aria-label="Flip between my casual photo and professional headshot"
                    >
                        <span ref={flipRef} className="profilepic-flip-inner">
                            <img src={profilepic} alt="Reece Lardy" className="profilepic profilepic-front" />
                            <img
                                src={profilepicFormal}
                                alt="Reece Lardy, professional headshot"
                                className="profilepic profilepic-back"
                            />
                        </span>
                    </button>
                    <button
                        type="button"
                        className={`flip-hint${flipTouched ? ' is-touched' : ''}`}
                        onClick={flipPhoto}
                        tabIndex={-1}
                        aria-hidden="true"
                    >
                        <svg
                            className="flip-hint-icon"
                            viewBox="0 0 24 24"
                            width="14"
                            height="14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
                            <path d="M3 21v-5h5" />
                            <path d="M3 12A9 9 0 0 1 18.5 5.8L21 8" />
                            <path d="M21 3v5h-5" />
                        </svg>
                        <span className="flip-hint-hover">Click to flip</span>
                        <span className="flip-hint-touch">Tap to flip</span>
                    </button>
                </div>
            </div>
            {!reducedMotion && (
                <button
                    type="button"
                    className="video-toggle"
                    onClick={() => setVideoPaused((paused) => !paused)}
                    aria-label={videoPaused ? 'Play background video' : 'Pause background video'}
                    aria-pressed={videoPaused}
                >
                    <i className={videoPaused ? 'fas fa-play' : 'fas fa-pause'}></i>
                </button>
            )}
        </div>
    );
}

export default Home;
