import React from 'react';
import ResumeEntryCard from '../components/ResumeEntryCard';
import { useResumeSheet } from '../context/ResumeSheetContext';

function Projects() {
    const { projects } = useResumeSheet();

    return (
        <div className="condiv">
            <p className="eyebrow">Things I&apos;ve built</p>
            <h1 className="section-title">Projects</h1>

            {projects.length === 0 ? (
                <p className="section-intro">No projects yet.</p>
            ) : (
                <div className="timeline">
                    {projects.map((entry) => (
                        <ResumeEntryCard key={`${entry.title}-${entry.startDate}`} entry={entry} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Projects;
