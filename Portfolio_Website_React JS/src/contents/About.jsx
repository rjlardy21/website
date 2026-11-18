import React from 'react';
import Reveal from '../components/Reveal';
import { useResumeSheet } from '../context/ResumeSheetContext';
import { OPEN_TO_WORK, OPEN_TO_WORK_LABEL } from '../data/status';

function About() {
    const { about, experience, education } = useResumeSheet();

    const latestRole = experience[0];
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
                    {OPEN_TO_WORK && (
                        <Reveal className="fact-card fact-card-status" delay={0}>
                            <i className="fas fa-circle-notch"></i>
                            <div>
                                <h4>Status</h4>
                                <p>
                                    <span className="status-dot" aria-hidden="true"></span>
                                    {OPEN_TO_WORK_LABEL}: software engineering
                                </p>
                            </div>
                        </Reveal>
                    )}
                    {latestRole && (
                        <Reveal className="fact-card" delay={80}>
                            <i className="fas fa-briefcase"></i>
                            <div>
                                <h4>Most recent role</h4>
                                <p>
                                    {latestRole.title} at {latestRole.org}
                                </p>
                            </div>
                        </Reveal>
                    )}
                    {latestEducation && (
                        <Reveal className="fact-card" delay={160}>
                            <i className="fas fa-graduation-cap"></i>
                            <div>
                                <h4>Education</h4>
                                <p>{latestEducation.org}</p>
                            </div>
                        </Reveal>
                    )}
                    <Reveal className="fact-card" delay={240}>
                        <i className="fas fa-code"></i>
                        <div>
                            <h4>Focus</h4>
                            <p>Full-stack development, cloud infrastructure, and DevOps</p>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    );
}

export default About;
