import React from 'react';
import { parseVisitDate } from '../utils/visitDates';

// The sheet is typed by hand, so tidy the display text (trim, collapse
// whitespace, consistent casing) without changing what was actually entered.
const tidy = (text) => String(text || '').replace(/\s+/g, ' ').trim();
const capFirst = (text) => {
    const t = tidy(text);
    return t.charAt(0).toUpperCase() + t.slice(1);
};
const titleCase = (text) =>
    tidy(text)
        .toLowerCase()
        .replace(/(^|\s)(\S)/g, (_, space, ch) => space + ch.toUpperCase());

// "1 - Zuppa Tuscana" is "<count> - <soup>" in the sheet.
function parseSoup(raw) {
    const match = tidy(raw).match(/^(\d+)\s*-\s*(.+)$/);
    return match ? { count: Number(match[1]), name: titleCase(match[2]) } : { count: null, name: titleCase(raw) };
}

function groupByMonth(visits) {
    const groups = new Map();
    visits.forEach((visit, index) => {
        const parsed = parseVisitDate(visit.date);
        const key = parsed ? parsed.monthKey : 'undated';
        if (!groups.has(key)) {
            groups.set(key, {
                key,
                label: parsed ? parsed.monthLabel : 'Other visits',
                sortValue: parsed ? parsed.sortValue : 0,
                rows: [],
            });
        }
        groups.get(key).rows.push({ visit, parsed, index });
    });

    return Array.from(groups.values())
        .sort((a, b) => b.sortValue - a.sortValue)
        .map((group) => ({
            ...group,
            // newest first within the month
            rows: group.rows.sort((a, b) => (b.parsed ? b.parsed.sortValue : 0) - (a.parsed ? a.parsed.sortValue : 0) || b.index - a.index),
        }));
}

function VisitRow({ visit, parsed }) {
    const protein = tidy(visit.protein);
    const hasProtein = protein && protein.toLowerCase() !== 'none';
    const soup = parseSoup(visit.soup);
    const eaten = Math.max(0, Math.min(100, visit.pctBowlsConsumed));

    return (
        <li className="visit-row">
            <div className="visit-date">
                <span className="visit-day">{parsed ? parsed.day : '–'}</span>
                <span className="visit-weekday">{parsed ? parsed.weekday : visit.date}</span>
            </div>

            <div className="visit-meal">
                <h4>{hasProtein ? titleCase(protein) : 'No protein'}</h4>
                <p>
                    {titleCase(visit.pastaType)} &middot; {titleCase(visit.sauce)} &middot; {tidy(visit.location)}
                </p>
            </div>

            <dl className="visit-stats">
                <div className="visit-stat">
                    <dt>Bowls</dt>
                    <dd>
                        {visit.bowlsOrdered}
                        <span className="eaten">
                            <span className="eaten-bar" aria-hidden="true">
                                <span style={{ width: `${eaten}%` }}></span>
                            </span>
                            <span className="eaten-label">{eaten}% eaten</span>
                        </span>
                    </dd>
                </div>
                <div className="visit-stat">
                    <dt>Breadsticks</dt>
                    <dd>{visit.breadsticks}</dd>
                </div>
            </dl>

            <p className="visit-meta">
                <span>
                    <i className="fas fa-utensil-spoon"></i>
                    {soup.name}
                    {soup.count > 1 ? ` ×${soup.count}` : ''}
                </span>
                <span>
                    <i className="fas fa-user-friends"></i>
                    {capFirst(visit.withWho) || 'Unknown'}
                </span>
                {visit.timesRecognized > 0 && (
                    <span>
                        <i className="fas fa-user-tie"></i>
                        Recognized {visit.timesRecognized}&times;
                    </span>
                )}
                {visit.weight != null && (
                    <span>
                        <i className="fas fa-weight"></i>
                        {visit.weight} lbs
                    </span>
                )}
            </p>
        </li>
    );
}

function VisitLog({ visits }) {
    const months = groupByMonth(visits);

    return (
        <div className="visit-log">
            {months.map((month) => {
                const count = month.rows.length;
                return (
                    <section key={month.key} className="visit-month">
                        <div className="visit-month-head">
                            <h3>{month.label}</h3>
                            <span>
                                {count} visit{count === 1 ? '' : 's'}
                            </span>
                        </div>
                        <ol className="visit-list">
                            {month.rows.map((row) => (
                                <VisitRow key={`${row.visit.date}-${row.index}`} visit={row.visit} parsed={row.parsed} />
                            ))}
                        </ol>
                    </section>
                );
            })}
        </div>
    );
}

export default VisitLog;
