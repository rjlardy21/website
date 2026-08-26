import React from 'react';
import ResumeEntryCard from '../components/ResumeEntryCard';
import { useResumeSheet } from '../context/ResumeSheetContext';

function Experience() {
    const { experience } = useResumeSheet();

    return (
        <div className="condiv">
            <p className="eyebrow">Where I&apos;ve worked</p>
            <h1 className="section-title">Experience</h1>

            {experience.length === 0 ? (
                <p className="section-intro">No experience entries yet.</p>
            ) : (
                <div className="timeline">
                    {experience.map((entry) => (
                        <ResumeEntryCard key={`${entry.title}-${entry.startDate}`} entry={entry} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Experience;
