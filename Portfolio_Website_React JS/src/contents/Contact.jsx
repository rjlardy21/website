import React from 'react';
import Reveal from '../components/Reveal';
import StatusBadge from '../components/StatusBadge';

const CONTACT_LINKS = [
    { label: 'Email', value: 'rjlardy21@gmail.com', href: 'mailto:rjlardy21@gmail.com', icon: 'fas fa-envelope' },
    {
        label: 'LinkedIn',
        value: 'in/reecelardy',
        href: 'https://linkedin.com/in/reecelardy/',
        icon: 'fab fa-linkedin-in',
        external: true,
    },
    {
        label: 'GitHub',
        value: 'rjlardy21',
        href: 'https://github.com/rjlardy21',
        icon: 'fab fa-github',
        external: true,
    },
    {
        label: 'Instagram',
        value: '@rlardy',
        href: 'https://instagram.com/rlardy',
        icon: 'fab fa-instagram',
        external: true,
    },
];

function Contact() {
    return (
        <div className="condiv contact">
            <p className="eyebrow">Let&apos;s talk</p>
            <h1 className="section-title">Contact Me</h1>
            <StatusBadge className="contact-status" />
            <p className="section-intro">
                If you&apos;re interested in working with me or hiring me, here are the best ways
                to get in touch:
            </p>
            <div className="contact-grid">
                {CONTACT_LINKS.map((link, index) => (
                    <Reveal
                        key={link.label}
                        as="a"
                        className="contact-card"
                        delay={index * 70}
                        href={link.href}
                        {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                        <span className="contact-card-icon">
                            <i className={link.icon}></i>
                        </span>
                        <span className="contact-card-text">
                            <small>{link.label}</small>
                            <strong>{link.value}</strong>
                        </span>
                    </Reveal>
                ))}
            </div>
            <a
                className="btn btn-primary btn-lg"
                href="/Reece_Lardy_Resume.pdf"
                download="Reece_Lardy_Resume.pdf"
            >
                <i className="fas fa-download"></i> Download resume
            </a>
        </div>
    );
}

export default Contact;
