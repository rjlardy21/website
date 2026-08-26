import React from 'react';
import ResumeEntryCard from '../components/ResumeEntryCard';
import DataSyncStatus from '../components/DataSyncStatus';
import { useResumeSheet } from '../context/ResumeSheetContext';

function Education() {
    const { status, education, error, updatedAt, refresh } = useResumeSheet();

    return (
        <div className="condiv">
            <p className="eyebrow">Academic background</p>
            <h1 className="section-title">Education</h1>
            <DataSyncStatus status={status} error={error} updatedAt={updatedAt} refresh={refresh} />

            {education.length === 0 ? (
                <p className="section-intro">No education entries yet.</p>
            ) : (
                <div className="timeline">
                    {education.map((entry) => (
                        <ResumeEntryCard key={`${entry.title}-${entry.startDate}`} entry={entry} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Education;
