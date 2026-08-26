import React, { useState } from 'react';

const WIDTH = 720;
const HEIGHT = 260;
const MARGIN = { top: 20, right: 20, bottom: 32, left: 44 };
const PLOT_W = WIDTH - MARGIN.left - MARGIN.right;
const PLOT_H = HEIGHT - MARGIN.top - MARGIN.bottom;

// Pick a "nice" tick step (1/2/5/10 x a power of ten) close to roughStep.
function niceStep(roughStep) {
    const magnitude = 10 ** Math.floor(Math.log10(roughStep));
    const residual = roughStep / magnitude;
    let step;
    if (residual > 5) {
        step = 10;
    } else if (residual > 2) {
        step = 5;
    } else if (residual > 1) {
        step = 2;
    } else {
        step = 1;
    }
    return step * magnitude;
}

// Clean, evenly-spaced axis ticks from 0 up to a ceiling >= maxValue.
function computeTicks(maxValue, targetCount) {
    if (maxValue <= 0) {
        return [0, 10];
    }
    const step = niceStep(maxValue / targetCount);
    const ceiling = Math.ceil(maxValue / step) * step;
    const ticks = [];
    for (let v = 0; v <= ceiling + 1e-9; v += step) {
        ticks.push(Math.round(v * 100) / 100);
    }
    return ticks;
}

function VisitTrendChart({ visits }) {
    const [activeIndex, setActiveIndex] = useState(null);

    const values = visits.map((visit) => visit.priceNegated);
    const ticks = computeTicks(Math.max(...values, 1), 4);
    const maxValue = ticks[ticks.length - 1];

    const xFor = (i) =>
        visits.length === 1
            ? MARGIN.left + PLOT_W / 2
            : MARGIN.left + (PLOT_W * i) / (visits.length - 1);
    const yFor = (value) => MARGIN.top + PLOT_H - (PLOT_H * value) / maxValue;

    const linePoints = visits.map((visit, i) => `${xFor(i)},${yFor(visit.priceNegated)}`).join(' ');
    const areaPoints = `${xFor(0)},${yFor(0)} ${linePoints} ${xFor(visits.length - 1)},${yFor(0)}`;

    const active = activeIndex != null ? visits[activeIndex] : null;

    return (
        <div className="chart-card">
            <div className="chart-card-head">
                <h3>Value negated per visit</h3>
                <span className="chart-card-sub">What the pass covered, trip by trip</span>
            </div>
            <svg
                className="trend-chart"
                viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                role="img"
                aria-label={`Line chart of value negated per visit, from $${values[0]} on ${visits[0].date} to $${
                    values[values.length - 1]
                } on ${visits[visits.length - 1].date}`}
            >
                {ticks.map((tick) => (
                    <g key={tick}>
                        <line
                            x1={MARGIN.left}
                            x2={WIDTH - MARGIN.right}
                            y1={yFor(tick)}
                            y2={yFor(tick)}
                            className="chart-gridline"
                        />
                        <text x={MARGIN.left - 10} y={yFor(tick)} className="chart-axis-label" textAnchor="end" dy="0.32em">
                            ${Math.round(tick)}
                        </text>
                    </g>
                ))}

                {visits.map((visit, i) => (
                    <text
                        key={visit.date}
                        x={xFor(i)}
                        y={HEIGHT - 8}
                        className="chart-axis-label"
                        textAnchor="middle"
                    >
                        {visit.date}
                    </text>
                ))}

                <polygon points={areaPoints} className="chart-area" />
                <polyline points={linePoints} className="chart-line" />

                <text
                    x={xFor(visits.length - 1)}
                    y={yFor(values[values.length - 1]) - 14}
                    className="chart-end-label"
                    textAnchor="middle"
                >
                    ${values[values.length - 1]}
                </text>

                {visits.map((visit, i) => (
                    <g key={visit.date}>
                        <circle cx={xFor(i)} cy={yFor(visit.priceNegated)} r={7} className="chart-marker-ring" />
                        <circle cx={xFor(i)} cy={yFor(visit.priceNegated)} r={5} className="chart-marker" />
                        <circle
                            cx={xFor(i)}
                            cy={yFor(visit.priceNegated)}
                            r={16}
                            className="chart-hit-target"
                            tabIndex={0}
                            role="button"
                            aria-label={`${visit.date}: $${visit.priceNegated} negated`}
                            onMouseEnter={() => setActiveIndex(i)}
                            onMouseLeave={() => setActiveIndex(null)}
                            onFocus={() => setActiveIndex(i)}
                            onBlur={() => setActiveIndex(null)}
                        />
                    </g>
                ))}

                {active && (
                    <line
                        x1={xFor(activeIndex)}
                        x2={xFor(activeIndex)}
                        y1={MARGIN.top}
                        y2={MARGIN.top + PLOT_H}
                        className="chart-crosshair"
                    />
                )}
            </svg>

            {active && (
                <div
                    className="chart-tooltip"
                    style={{
                        left: `${(xFor(activeIndex) / WIDTH) * 100}%`,
                        top: `${(yFor(active.priceNegated) / HEIGHT) * 100}%`,
                    }}
                >
                    <strong>${active.priceNegated}</strong>
                    <span>{active.date}</span>
                </div>
            )}
        </div>
    );
}

export default VisitTrendChart;
