import React from 'react';
import StatTile from '../components/StatTile';
import VisitLog from '../components/VisitLog';
import DataSyncStatus from '../components/DataSyncStatus';
import { usePastaPassSheet } from '../hooks/usePastaPassSheet';

function sum(visits, field) {
    return visits.reduce((total, visit) => total + visit[field], 0);
}

function PastaPassTracker() {
    const { status, visits, startingWeight, error, updatedAt, refresh } = usePastaPassSheet();

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
                    Never-Ending Pasta Bowl&reg; menu &mdash; pasta, sauce, and toppings, plus a
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

            <p className="section-intro">
                Tracking every trip on Alex&apos;s Never Ending Pasta Pass &mdash; pulled live from
                the{' '}
                <a
                    href="https://docs.google.com/spreadsheets/d/1MoHaOUgwANQGme-gn76gjv-zfgnqdXGjLJD0p-PiEg4"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    tracking sheet
                </a>
                .
            </p>

            <DataSyncStatus status={status} error={error} updatedAt={updatedAt} refresh={refresh} />

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
                            : '—'
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
                <p className="section-intro">No visits logged yet &mdash; check back after the next trip.</p>
            ) : (
                <VisitLog visits={visits} />
            )}
        </div>
    );
}

export default PastaPassTracker;
