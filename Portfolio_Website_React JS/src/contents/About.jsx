import React from 'react';
import { useResumeSheet } from '../context/ResumeSheetContext';

function About() {
    const { about, experience, education } = useResumeSheet();

    const currentRole = experience.find((e) => e.endDate.toLowerCase() === 'present') || experience[0];
    const latestEducation = education[0];

    return (
        <div className="condiv about">
            <p className="eyebrow">Get to know me</p>
            <h1 className="section-title">About Me</h1>
            <div className="about-grid">
                <div className="about-copy">
                    <h2>{about.headline}</h2>
                    {about.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
                <div className="about-facts">
                    {currentRole && (
                        <div className="fact-card">
                            <i className="fas fa-briefcase"></i>
                            <div>
                                <h4>Currently</h4>
                                <p>
                                    {currentRole.title} at {currentRole.org}
                                </p>
                            </div>
                        </div>
                    )}
                    {latestEducation && (
                        <div className="fact-card">
                            <i className="fas fa-graduation-cap"></i>
                            <div>
                                <h4>Education</h4>
                                <p>{latestEducation.org}</p>
                            </div>
                        </div>
                    )}
                    <div className="fact-card">
                        <i className="fas fa-code"></i>
                        <div>
                            <h4>Focus</h4>
                            <p>Full-stack development, cloud infrastructure, and DevOps</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
