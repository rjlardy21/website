// Fallback snapshot, hand-synced from the résumé Google Sheet, used only if
// the live fetch fails. Ask to have this file updated whenever the sheet
// changes materially.
// Source: https://docs.google.com/spreadsheets/d/1cfbNbcYkw_frbhe-Jgq8OJLi9DKR0YOvxz4XvBs3Qtw

export const experience = [
    {
        title: 'Lead Software Engineer',
        org: 'Northmarq',
        location: 'Bloomington, MN',
        startDate: 'Mar 2026',
        endDate: 'Present',
        bullets: [
            "Led the migration of Northmarq's corporate website from an outsourced consulting vendor to a fully in-house platform, architecting the technical solution end to end while maintaining zero downtime on the live production site.",
            'Architected a modernized web platform on Microsoft Azure, integrating a Vue.js frontend and .NET CMS gateway with the existing Drupal CMS — preserving working infrastructure investment instead of a full rebuild.',
            "Designed and built CI/CD pipelines in Azure DevOps, establishing the team's merge/review process and engineering documentation from the ground up.",
            'Delivered significant, measurable improvements to SEO rankings and site performance scores versus the prior outsourced implementation.',
        ],
        link: null,
    },
    {
        title: 'Software Engineer (Hybrid)',
        org: 'Sportradar',
        location: 'Minneapolis, MN',
        startDate: 'Aug 2021',
        endDate: 'Mar 2026',
        bullets: [
            'Led development of an API Gateway replacement using TypeScript, Node.js, GraphQL, and React, improving self-service API key management (console.sportradar.com).',
            'Mastered complex legacy systems, including JRuby backend, message brokers, and AWS-hosted services, while managing critical bug fixes and feature enhancements.',
            'Gained expertise in Kubernetes, Helm, and AWS EKS, assuming 24/7 on-call responsibilities within four months.',
            'Led security initiatives, reducing vulnerabilities and strengthening cybersecurity measures.',
            'Mentored new hires, accelerating onboarding and technical proficiency.',
            'Developed automation tools, including a SOX compliance data processor and a URL transformation app for internal data feeds.',
        ],
        link: null,
    },
    {
        title: 'Software Engineer Intern (Remote)',
        org: 'Dispatch-IT',
        location: 'Bloomington, MN',
        startDate: 'May 2020',
        endDate: 'August 2020',
        bullets: [
            'Developed features for the new multi-stop order solution for the mobile and web applications, collaborating with a fully remote Agile team.',
            'Worked extensively with Atom and used RSpec for writing unit tests, including stub testing for MySQL databases, to ensure quality and functionality through behavior-driven development.',
            'Contributed to the development and implementation of a real-time tracking feature within the Dispatch-IT platform, utilizing React and Node.js to enhance user experience and improve data accuracy for logistics clients by 15%.',
        ],
        link: null,
    },
    {
        title: 'Software Engineer Intern',
        org: 'Pearson VUE',
        location: 'Bloomington, MN',
        startDate: 'May 2019',
        endDate: 'August 2019',
        bullets: [
            'Developed features for a Windows application as part of an Agile-Scrum team.',
            'Worked extensively with IntelliJ IDEA, Ant, and Gradle to enhance development workflows.',
            'Implemented unit tests using JUnit, incorporating stub testing for MySQL databases following behavior-driven development (BDD) principles.',
        ],
        link: null,
    },
];

export const projects = [
    {
        title: 'ECE 453: Embedded Microprocessor System Design',
        org: 'UW-Madison',
        location: 'Madison, WI',
        startDate: 'Jan 2021',
        endDate: 'May 2021',
        bullets: [
            'Designed and implemented a product recognized and sponsored by Epic engineers.',
            'Developed custom PSoC firmware and designed custom printed circuit boards (PCBs) to fit within a cupholder.',
            'Integrated sensor data into game-table functionality, enabling user cups to interact with gameplay.',
        ],
        link: null,
    },
    {
        title: 'COMPSCI 506: Software Engineering',
        org: 'UW-Madison',
        location: 'Madison, WI',
        startDate: 'Jan 2021',
        endDate: 'May 2021',
        bullets: [
            'Developed a standalone web application that visualizes music in 3D using THREE.js, AngularJS, and Firebase.',
            'Engineered algorithms to process and smooth local .mp3 data and Spotify Web Playback SDK data.',
            'Utilized THREE.js to create immersive 3D visualizations and implemented testing with Karma and Protractor.',
        ],
        link: 'https://music-visualizer-b2ae6.web.app/',
    },
];

export const education = [
    {
        title: 'Bachelor of Science in Computer Engineering',
        org: 'University of Wisconsin-Madison',
        location: 'Madison, WI',
        startDate: 'Aug 2017',
        endDate: 'May 2021',
        bullets: ["Dean's Honor List", 'Software Development Club', 'Wisconsin Racing (Self-driving)'],
        link: null,
    },
];
