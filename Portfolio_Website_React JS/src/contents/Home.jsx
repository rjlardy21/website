import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactTypingEffect from 'react-typing-effect';
import profilepic from '../img/reece_photo.webp';
import profilepicFormal from '../img/reece_headshot.webp';
import bgVideo from '../img/bg.mp4';
import Social from '../components/Social';

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

    // Click/tap/Enter flips the photo by hand: freeze the auto animation on the
    // side currently showing, then rotate to the other side.
    const flipPhoto = () => {
        const el = flipRef.current;
        if (!el) return;
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
                <p className="eyebrow">Hello, I&apos;m</p>
                <button
                    type="button"
                    className="profilepic-flip"
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
                <span className="flip-hint" aria-hidden="true">
                    <i className="fas fa-rotate"></i> Tap to flip
                </span>
                <h1 className="hero-name">Reece Lardy</h1>
                <ReactTypingEffect
                    className="typingeffect"
                    text={['Software Engineer', 'AI Application Developer', 'Full-Stack Developer']}
                    speed={100}
                    eraseDelay={700}
                />
                <p className="hero-tagline">
                    Clean, maintainable software for ambiguous problems. Solid engineering fundamentals
                    plus modern AI development, turned into secure, scalable products.
                </p>
                <div className="hero-actions">
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
                <Social />
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
