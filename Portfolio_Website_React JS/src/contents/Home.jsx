import React from 'react';
import { Link } from 'react-router-dom';
import ReactTypingEffect from 'react-typing-effect';
import profilepic from '../img/reece_photo.JPG';
import profilepicFormal from '../img/reece_headshot.png';
import Social from '../components/Social';

function Home() {
    return (
        <div className="condiv home">
            <p className="eyebrow">Hello, I&apos;m</p>
            <div className="profilepic-flip">
                <div className="profilepic-flip-inner">
                    <img src={profilepic} alt="Reece Lardy" className="profilepic profilepic-front" />
                    <img
                        src={profilepicFormal}
                        alt="Reece Lardy, professional headshot"
                        className="profilepic profilepic-back"
                    />
                </div>
            </div>
            <h1 className="hero-name">Reece Lardy</h1>
            <ReactTypingEffect
                className="typingeffect"
                text={['Software Engineer', 'Computer Engineer', 'Full-Stack Developer']}
                speed={100}
                eraseDelay={700}
            />
            <p className="hero-tagline">
                I build reliable, well-crafted software across web, Android, and iOS &mdash;
                with a solid foundation in algorithms, databases, and system design.
            </p>
            <div className="hero-actions">
                <Link className="btn btn-primary" to="/contact">
                    Get in touch
                </Link>
                <a
                    className="btn btn-secondary"
                    href="https://github.com/rjlardy21"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View GitHub
                </a>
            </div>
            <Social />
        </div>
    );
}

export default Home;
