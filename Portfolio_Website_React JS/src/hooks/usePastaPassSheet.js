import { useCallback, useEffect, useState } from 'react';
import { parseCsv } from '../utils/csv';
import { visits as fallbackVisits, startingWeight as fallbackStartingWeight } from '../data/pastaPassData';

// Public CSV export of Alex's "pastapass" Google Sheet (Sheet2 / Table1).
// Requires the sheet's sharing setting to be "Anyone with the link can view".
const SHEET_ID = '1MoHaOUgwANQGme-gn76gjv-zfgnqdXGjLJD0p-PiEg4';
const SHEET_GID = '1333714408';
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

const REFRESH_INTERVAL_MS = 12 * 60 * 60 * 1000; // re-poll every 12 hours while the page is open

function toNumber(value) {
    if (value == null) {
        return null;
    }
    const cleaned = String(value).replace(/[$%,\s]/g, '');
    if (cleaned === '') {
        return null;
    }
    const num = Number(cleaned);
    return Number.isNaN(num) ? null : num;
}

function rowsToVisits(rows) {
    const [header, ...body] = rows;
    if (!header) {
        return [];
    }

    const columnIndex = (name) =>
        header.findIndex((cell) => cell.trim().toLowerCase() === name.toLowerCase());

    const indices = {
        date: columnIndex('Date'),
        visits: columnIndex('# of visits'),
        location: columnIndex('Location'),
        breadsticks: columnIndex('Breadsticks Consumed'),
        soup: columnIndex('Soup Consumed'),
        pctBowlsConsumed: columnIndex('% of pasta bowls consumed'),
        pastaType: columnIndex('Pasta Type'),
        sauce: columnIndex('Sauce'),
        protein: columnIndex('Protein'),
        bowlsOrdered: columnIndex('# of bowls ordered'),
        priceNegated: columnIndex('Price negated'),
        timesRecognized: columnIndex('# of times employee recognizes me'),
        withWho: columnIndex('Who I went with'),
        weight: columnIndex('Weight (10pm)'),
    };

    const get = (row, key) => {
        const idx = indices[key];
        return idx === -1 || idx == null ? '' : (row[idx] || '').trim();
    };

    return body
        .map((row) => ({
            date: get(row, 'date'),
            visits: toNumber(get(row, 'visits')) || 0,
            location: get(row, 'location'),
            breadsticks: toNumber(get(row, 'breadsticks')) || 0,
            soup: get(row, 'soup'),
            pctBowlsConsumed: toNumber(get(row, 'pctBowlsConsumed')) || 0,
            pastaType: get(row, 'pastaType'),
            sauce: get(row, 'sauce'),
            protein: get(row, 'protein'),
            bowlsOrdered: toNumber(get(row, 'bowlsOrdered')) || 0,
            priceNegated: toNumber(get(row, 'priceNegated')) || 0,
            timesRecognized: toNumber(get(row, 'timesRecognized')) || 0,
            withWho: get(row, 'withWho'),
            weight: toNumber(get(row, 'weight')),
        }))
        // The sheet is pre-filled with a blank row for every future date; only
        // keep rows that actually have a logged visit.
        .filter((visit) => visit.location);
}

function extractStartingWeight(headerRow) {
    if (!headerRow || !headerRow.length) {
        return fallbackStartingWeight;
    }
    const noteCell = headerRow[headerRow.length - 1] || '';
    const match = noteCell.match(/(\d+(\.\d+)?)/);
    return match ? Number(match[1]) : fallbackStartingWeight;
}

export function usePastaPassSheet() {
    const [state, setState] = useState({
        status: 'loading',
        source: 'loading',
        visits: fallbackVisits,
        startingWeight: fallbackStartingWeight,
        error: null,
        updatedAt: null,
    });

    const load = useCallback(() => {
        setState((prev) => ({ ...prev, status: 'loading' }));

        fetch(`${SHEET_CSV_URL}&_=${Date.now()}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Sheet request failed (HTTP ${res.status})`);
                }
                return res.text();
            })
            .then((text) => {
                const rows = parseCsv(text);
                setState({
                    status: 'ready',
                    source: 'live',
                    visits: rowsToVisits(rows),
                    startingWeight: extractStartingWeight(rows[0]),
                    error: null,
                    updatedAt: new Date(),
                });
            })
            .catch((err) => {
                setState((prev) => ({
                    ...prev,
                    status: 'error',
                    source: 'fallback',
                    visits: fallbackVisits,
                    startingWeight: fallbackStartingWeight,
                    error: err.message,
                }));
            });
    }, []);

    useEffect(() => {
        load();
        const interval = setInterval(load, REFRESH_INTERVAL_MS);
        return () => clearInterval(interval);
    }, [load]);

    return { ...state, refresh: load };
}
