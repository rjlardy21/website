import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';

function FeaturedProject({ project, index = 0 }) {
    return (
        <Reveal className="featured-card" delay={Math.min(index, 4) * 80}>
            <div className="featured-head">
                <h3>{project.title}</h3>
                <span className="featured-stack">{project.stack}</span>
            </div>
            <p className="featured-summary">{project.summary}</p>
            <ul className="entry-bullets">
                {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                ))}
            </ul>
            <div className="featured-links">
                {project.links.map((link) =>
                    link.to ? (
                        <Link key={link.label} className="entry-link" to={link.to}>
                            {link.label} <i className="fas fa-arrow-right"></i>
                        </Link>
                    ) : (
                        <a
                            key={link.label}
                            className="entry-link"
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {link.label} <i className="fas fa-external-link-alt"></i>
                        </a>
                    )
                )}
            </div>
        </Reveal>
    );
}

export default FeaturedProject;
