import React from 'react';
import Social from '../components/Social';

function Contact() {
    return (
        <div className="condiv contact">
            <p className="eyebrow">Let&apos;s talk</p>
            <h1 className="section-title">Contact Me</h1>
            <p className="section-intro">
                If you&apos;re interested in working with me or hiring me, here are the best ways
                to get in touch:
            </p>
            <div className="contact-list">
                <a className="contact-row" href="mailto:rjlardy21@gmail.com">
                    <i className="fas fa-envelope"></i>
                    <span>rjlardy21@gmail.com</span>
                </a>
                <a
                    className="contact-row"
                    href="https://instagram.com/rlardy"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="fab fa-instagram"></i>
                    <span>@rlardy</span>
                </a>
            </div>
            <Social />
        </div>
    );
}

export default Contact;
