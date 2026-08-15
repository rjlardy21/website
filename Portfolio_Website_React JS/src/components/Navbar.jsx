import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Navitem from './Navitem';
import Social from './Social';
import headshot from '../img/reece_headshot.png';

const NAV_ITEMS = [
    { item: 'Home', tolink: '/', icon: 'fas fa-home', exact: true },
    { item: 'About', tolink: '/about', icon: 'fas fa-user' },
    { item: 'Education', tolink: '/education', icon: 'fas fa-graduation-cap' },
    { item: 'Experience', tolink: '/experience', icon: 'fas fa-briefcase' },
    { item: 'Skills', tolink: '/skills', icon: 'fas fa-code' },
    { item: 'Contact', tolink: '/contact', icon: 'fas fa-envelope' },
];

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // Close the mobile menu whenever the route changes.
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    return (
        <nav className={menuOpen ? 'nav-open' : ''}>
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
                <ul>
                    {NAV_ITEMS.map((navItem) => (
                        <Navitem
                            key={navItem.tolink}
                            item={navItem.item}
                            tolink={navItem.tolink}
                            icon={navItem.icon}
                            exact={navItem.exact}
                        />
                    ))}
                </ul>
                <Social />
            </div>
        </nav>
    );
}

export default Navbar;
