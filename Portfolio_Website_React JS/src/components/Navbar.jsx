import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Navitem from './Navitem';
import Social from './Social';
import headshot from '../img/reece_headshot.webp';

const NAV_ITEMS = [
    { item: 'Home', tolink: '/', icon: 'fas fa-home', exact: true },
    { item: 'About', tolink: '/about', icon: 'fas fa-user' },
    { item: 'Experience', tolink: '/experience', icon: 'fas fa-briefcase' },
    { item: 'Education', tolink: '/education', icon: 'fas fa-graduation-cap' },
    { item: 'Projects', tolink: '/projects', icon: 'fas fa-project-diagram' },
    { item: 'Contact', tolink: '/contact', icon: 'fas fa-envelope' },
];

const FUN_NAV_ITEMS = [
    { item: 'Pasta Pass Tracker', tolink: '/pasta-pass-tracker', icon: 'fas fa-utensils' },
    { item: "What I'm Listening To", tolink: '/listening-to', icon: 'fas fa-music' },
];

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [highlight, setHighlight] = useState(null);
    const listRef = useRef(null);
    const location = useLocation();

    // Close the mobile menu whenever the route changes.
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    // Slide a single highlight behind whichever link is active.
    const updateHighlight = useCallback(() => {
        const list = listRef.current;
        if (!list) return;
        const active = list.querySelector('a.active');
        if (!active) {
            setHighlight(null);
            return;
        }
        const listBox = list.getBoundingClientRect();
        const activeBox = active.getBoundingClientRect();
        setHighlight({ top: activeBox.top - listBox.top, height: activeBox.height });
    }, []);

    useEffect(() => {
        updateHighlight();
    }, [location, menuOpen, updateHighlight]);

    useEffect(() => {
        window.addEventListener('resize', updateHighlight);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(updateHighlight);
        return () => window.removeEventListener('resize', updateHighlight);
    }, [updateHighlight]);

    const skipToContent = (event) => {
        event.preventDefault();
        const target = document.querySelector('.condiv');
        if (target) {
            target.setAttribute('tabindex', '-1');
            target.focus();
        }
    };

    const isHome = location.pathname === '/';
    const navClass = [menuOpen ? 'nav-open' : '', isHome ? 'nav-glass' : ''].filter(Boolean).join(' ');

    return (
        <>
            <a className="skip-link" href="#content" onClick={skipToContent}>
                Skip to content
            </a>
            <nav className={navClass}>
                <div className="nav-top">
                    <NavLink to="/" exact className="brand">
                        <span className="brand-mark">
                            <img src={headshot} alt="Reece Lardy" />
                        </span>
                        <span className="brand-text">
                            <strong>Reece Lardy</strong>
                            <small>Software Engineer</small>
                        </span>
                    </NavLink>
                    <button
                        type="button"
                        className="nav-toggle"
                        aria-label="Toggle navigation menu"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </button>
                </div>
                <div className="nav-collapsible">
                    <ul ref={listRef}>
                        {highlight && (
                            <li
                                className="nav-highlight"
                                aria-hidden="true"
                                style={{ transform: `translateY(${highlight.top}px)`, height: `${highlight.height}px` }}
                            ></li>
                        )}
                        <li className="nav-label">Portfolio</li>
                        {NAV_ITEMS.map((navItem) => (
                            <Navitem
                                key={navItem.tolink}
                                item={navItem.item}
                                tolink={navItem.tolink}
                                icon={navItem.icon}
                                exact={navItem.exact}
                            />
                        ))}
                        <li className="nav-divider" role="separator"></li>
                        <li className="nav-label">Side projects</li>
                        {FUN_NAV_ITEMS.map((navItem) => (
                            <Navitem
                                key={navItem.tolink}
                                item={navItem.item}
                                tolink={navItem.tolink}
                                icon={navItem.icon}
                                exact={navItem.exact}
                            />
                        ))}
                    </ul>
                    <a className="nav-resume" href="/Reece_Lardy_Resume.pdf" download="Reece_Lardy_Resume.pdf">
                        <i className="fas fa-download"></i> Resume
                    </a>
                    <Social />
                </div>
            </nav>
        </>
    );
}

export default Navbar;
