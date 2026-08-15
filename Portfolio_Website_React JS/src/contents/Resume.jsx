import React from 'react';
import ResumePDF from '../components/ResumePDF';

function Resume() {
    return (
        <div className="condiv resume">
            <p className="eyebrow">My resume</p>
            <h1 className="section-title">Resume</h1>
            <div className="resume-viewer">
                <ResumePDF />
            </div>
        </div>
    );
}

export default Resume;
