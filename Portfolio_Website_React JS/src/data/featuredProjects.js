// Hand-written featured projects, shown above the Google-Sheet-driven list on
// the Projects page. `to` is an in-site route, `href` an external link.
export const featuredProjects = [
    {
        title: 'This portfolio',
        stack: 'React · Firebase Hosting · Google Sheets',
        summary: 'The site you are on, built end to end and kept current without redeploys.',
        bullets: [
            'Résumé content (experience, education, projects) syncs daily from a Google Sheet, so edits go live without touching code.',
            'Deployed on Firebase Hosting with a custom domain and cache rules tuned so new deploys show up immediately.',
            'Performance and accessibility pass: right-sized WebP images, non-blocking fonts, WCAG-checked contrast, reduced-motion support.',
        ],
        links: [{ label: 'View source', href: 'https://github.com/rjlardy21/website' }],
    },
    {
        title: "What I'm Listening To",
        stack: 'Firebase Cloud Functions · Spotify Web API',
        summary: 'A live now-playing page backed by a small serverless proxy.',
        bullets: [
            'A 2nd-gen Cloud Function talks to the Spotify API so credentials stay server-side in Secret Manager, never in the browser.',
            'The page polls every few minutes and shows the current track, or the last one played.',
        ],
        links: [{ label: 'See it live', to: '/listening-to' }],
    },
    {
        title: 'Alex Pasta Pass Tracker',
        stack: 'React · Google Sheets',
        summary: 'A live dashboard tracking one Olive Garden Never-Ending Pasta Pass season.',
        bullets: [
            'Reads a public Google Sheet, parses it client-side with a custom CSV parser, and refreshes on a timer.',
            'Month-grouped visit log with bowls, breadsticks, weigh-ins and a pass-window progress bar.',
        ],
        links: [{ label: 'See it live', to: '/pasta-pass-tracker' }],
    },
];
