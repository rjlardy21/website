import React from 'react';

const SKILLS = [
    { name: 'HTML', icon: 'fab fa-html5' },
    { name: 'CSS', icon: 'fab fa-css3-alt' },
    { name: 'JS', icon: 'fab fa-js' },
    { name: 'PHP', icon: 'fab fa-php' },
    { name: 'REACT JS', icon: 'fab fa-react' },
    { name: 'FIREBASE', icon: 'fas fa-fire' },
    { name: 'MIT APP', icon: 'fas fa-mobile-alt' },
];

function Skills() {
    return (
        <div className="condiv skills">
            <p className="eyebrow">What I work with</p>
            <h1 className="section-title">Skills</h1>
            <ul className="skills-grid">
                {SKILLS.map((skill) => (
                    <li key={skill.name} className="skill-pill">
                        <i className={skill.icon}></i>
                        <span>{skill.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Skills;
