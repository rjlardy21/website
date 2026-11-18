import React from 'react';
import FeaturedProject from '../components/FeaturedProject';
import ResumeEntryCard from '../components/ResumeEntryCard';
import { useResumeSheet } from '../context/ResumeSheetContext';
import { featuredProjects } from '../data/featuredProjects';

function Projects() {
    const { projects } = useResumeSheet();

    return (
        <div className="condiv">
            <p className="eyebrow">Things I&apos;ve built</p>
            <h1 className="section-title">Projects</h1>

            <h2 className="subsection-title">Featured</h2>
            <div className="featured-grid">
                {featuredProjects.map((project, index) => (
                    <FeaturedProject key={project.title} project={project} index={index} />
                ))}
            </div>

            <h2 className="subsection-title projects-more">More projects</h2>
            {projects.length === 0 ? (
                <p className="section-intro">No projects yet.</p>
            ) : (
                <div className="timeline">
                    {projects.map((entry, index) => (
                        <ResumeEntryCard key={`${entry.title}-${entry.startDate}`} entry={entry} index={index} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Projects;
