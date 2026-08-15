import React from 'react';

function SummaryCard({ title, company, from, to, city, state, summary }) {
    return (
        <div className="summarycard">
            <div className="card-icon">
                <i className="fas fa-briefcase"></i>
            </div>
            <div className="compdet">
                <div className="card-heading">
                    <h3>{title}</h3>
                    <span className="date-range">{from} &mdash; {to}</span>
                </div>
                <h4 className="secondtext">{company} &middot; {city}, {state}</h4>
                <p className="summarytext">{summary}.</p>
            </div>
        </div>
    );
}

export default SummaryCard;
