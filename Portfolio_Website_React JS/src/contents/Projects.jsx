import React from 'react';
import ResumeEntryCard from '../components/ResumeEntryCard';
import DataSyncStatus from '../components/DataSyncStatus';
import { useResumeSheet } from '../context/ResumeSheetContext';

function Projects() {
    const { status, projects, error, updatedAt, refresh } = useResumeSheet();

    return (
        <div className="condiv">
            <p className="eyebrow">Things I&apos;ve built</p>
            <h1 className="section-title">Projects</h1>
            <DataSyncStatus status={status} error={error} updatedAt={updatedAt} refresh={refresh} showTimestamp={false} />

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
