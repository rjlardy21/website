import React from 'react';

function ResumeEntryCard({ entry }) {
    return (
        <div className="widecard">
            <div className="compdet">
                <div className="card-heading">
                    <h3>{entry.title}</h3>
                    <span className="date-range">
                        {entry.startDate} &mdash; {entry.endDate}
                    </span>
                </div>
                <h4 className="secondtext">
                    {entry.org}
                    {entry.location ? ` · ${entry.location}` : ''}
                </h4>
                {entry.bullets.length > 0 && (
                    <ul className="entry-bullets">
                        {entry.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                        ))}
                    </ul>
                )}
                {entry.link && (
                    <a className="entry-link" href={entry.link} target="_blank" rel="noopener noreferrer">
                        View project <i className="fas fa-external-link-alt"></i>
                    </a>
                )}
            </div>
        </div>
    );
}

export default ResumeEntryCard;
