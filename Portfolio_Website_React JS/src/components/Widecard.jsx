import React from 'react';

function Widecard({ title, where, from, to }) {
    return (
        <div className="widecard">
            <div className="card-icon">
                <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="compdet">
                <div className="card-heading">
                    <h3>{title}</h3>
                    <span className="date-range">{from} &mdash; {to}</span>
                </div>
                <h4 className="secondtext">{where}</h4>
            </div>
        </div>
    );
}

export default Widecard;
