import React from 'react';
import Reveal from '../components/Reveal';
import StatTile from '../components/StatTile';
import VisitLog from '../components/VisitLog';
import { usePastaPassSheet } from '../hooks/usePastaPassSheet';

function sum(visits, field) {
    return visits.reduce((total, visit) => total + visit[field], 0);
}

const DAY_MS = 24 * 60 * 60 * 1000;
const PASS_START = new Date(2026, 7, 24); // Aug 24, 2026
const PASS_END = new Date(2026, 10, 22); // Nov 22, 2026

function getPassProgress(now = new Date()) {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const total = Math.round((PASS_END - PASS_START) / DAY_MS) + 1;
    const elapsed = Math.round((today - PASS_START) / DAY_MS) + 1;
    if (elapsed < 1) {
        const days = 1 - elapsed;
        return { state: 'upcoming', total, percent: 0, label: `Starts in ${days} day${days === 1 ? '' : 's'}` };
    }
    if (elapsed > total) {
        return { state: 'ended', total, percent: 100, label: 'Pass window closed' };
    }
    const left = total - elapsed;
    return {
        state: 'active',
        total,
        elapsed,
        percent: Math.round((elapsed / total) * 100),
        label: left === 0 ? 'Last day' : `${left} day${left === 1 ? '' : 's'} left`,
    };
}

function PassProgress() {
    const progress = getPassProgress();
    return (
        <Reveal className="pass-progress">
            <div className="pass-progress-head">
                <strong>
                    {progress.state === 'active' ? `Day ${progress.elapsed} of ${progress.total}` : 'Pass window'}
                </strong>
                <span>{progress.label}</span>
            </div>
            <div
                className="pass-progress-track"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress.percent}
                aria-label="Pass window progress"
            >
                <div className="pass-progress-fill" style={{ width: `${progress.percent}%` }}></div>
            </div>
            <div className="pass-progress-ends">
                <span>Aug 24</span>
                <span>Nov 22</span>
            </div>
        </Reveal>
    );
}

function PastaPassTracker() {
    const { visits, startingWeight } = usePastaPassSheet();

    const totalVisits = sum(visits, 'visits');
    const totalBreadsticks = sum(visits, 'breadsticks');
    const totalBowlsOrdered = sum(visits, 'bowlsOrdered');
    const totalRecognized = sum(visits, 'timesRecognized');

    const weighIns = visits.filter((visit) => visit.weight != null);
    const latestWeight = weighIns.length ? weighIns[weighIns.length - 1].weight : null;
    const weightChange = latestWeight != null ? latestWeight - startingWeight : null;

    return (
        <div className="condiv">
            <p className="eyebrow">Side project</p>
            <h1 className="section-title">Alex Pasta Pass Tracker</h1>

            <div className="pass-info-card">
                <p>
                    Olive Garden&apos;s{' '}
                    <a
                        href="https://www.olivegarden.com/pastapass"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Never-Ending Pasta Pass&reg;
                    </a>{' '}
                    is a limited-run promotion: $100 for unlimited dine-in visits to the
                    Never-Ending Pasta Bowl&reg; menu: pasta, sauce, and toppings, plus a
                    first course of soup or salad and breadsticks every time. Only 10,000 passes
                    were sold, and it&apos;s dine-in only (no To Go, delivery, or sharing).
                </p>
                <div className="pass-info-facts">
                    <span>
                        <strong>Price</strong> $100
                    </span>
                    <span>
                        <strong>Duration</strong> 13 weeks
                    </span>
                    <span>
                        <strong>Window</strong> Aug 24 &ndash; Nov 22, 2026
                    </span>
                    <span>
                        <strong>Passes sold</strong> 10,000
                    </span>
                </div>
            </div>

            <PassProgress />

            <div className="stat-grid">
                <StatTile icon="fas fa-utensils" label="Visits logged" value={totalVisits} />
                <StatTile icon="fas fa-bread-slice" label="Breadsticks eaten" value={totalBreadsticks} />
                <StatTile icon="fas fa-utensil-spoon" label="Bowls ordered" value={totalBowlsOrdered} />
                <StatTile
                    icon="fas fa-user-tie"
                    label="Times recognized by staff"
                    value={totalRecognized}
                />
                <StatTile
                    icon="fas fa-weight"
                    label="Weight since start"
                    value={
                        weightChange != null
                            ? `${weightChange > 0 ? '+' : ''}${weightChange.toFixed(1)} lbs`
                            : 'N/A'
                    }
                    hint={
                        latestWeight != null
                            ? `${startingWeight} lbs → ${latestWeight} lbs`
                            : `Starting weight: ${startingWeight} lbs`
                    }
                />
            </div>

            <h2 className="subsection-title">Visit log</h2>
            {visits.length === 0 ? (
                <p className="section-intro">No visits logged yet. Check back after the next trip.</p>
            ) : (
                <VisitLog visits={visits} />
            )}
        </div>
    );
}

export default PastaPassTracker;
