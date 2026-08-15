import React from 'react';

function About() {
    return (
        <div className="condiv about">
            <p className="eyebrow">Get to know me</p>
            <h1 className="section-title">About Me</h1>
            <div className="about-grid">
                <div className="about-copy">
                    <h2>Software Developer &amp; Computer Engineer</h2>
                    <p>
                        I started my journey in the world of computers at a young age, and I am now
                        22 years old. I&apos;m a talented individual with strong communication skills,
                        team spirit, and a B.S. in Computer Engineering from the University of
                        Wisconsin&ndash;Madison, in search of a full-time position as a Software Engineer.
                    </p>
                    <p>
                        I bring expertise in writing full-stack code to support multiple platforms,
                        including web, Android, and iOS, along with a solid grasp of algorithms,
                        databases, data structures, and object-oriented design.
                    </p>
                </div>
                <div className="about-facts">
                    <div className="fact-card">
                        <i className="fas fa-graduation-cap"></i>
                        <div>
                            <h4>Education</h4>
                            <p>Computer Engineering, University of Wisconsin&ndash;Madison</p>
                        </div>
                    </div>
                    <div className="fact-card">
                        <i className="fas fa-code"></i>
                        <div>
                            <h4>Focus</h4>
                            <p>Full-stack development across web, Android &amp; iOS</p>
                        </div>
                    </div>
                    <div className="fact-card">
                        <i className="fas fa-briefcase"></i>
                        <div>
                            <h4>Experience</h4>
                            <p>Multiple software &amp; IoT engineering internships</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
