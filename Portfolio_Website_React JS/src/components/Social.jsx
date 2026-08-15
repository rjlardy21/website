import React from 'react';

function Social() {
    return (
        <div className="social">
            <a href="https://github.com/rjlardy21" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com/in/reecelardy/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://instagram.com/rlardy" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
            </a>
            <a href="mailto:rjlardy21@gmail.com" aria-label="Email">
                <i className="fas fa-envelope"></i>
            </a>
        </div>
    );
}

export default Social;
