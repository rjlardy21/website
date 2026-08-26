import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { parseCsv } from '../utils/csv';
import {
    experience as fallbackExperience,
    projects as fallbackProjects,
    education as fallbackEducation,
} from '../data/resumeData';

// Public CSV export of Reece's résumé Google Sheet (Section: Experience /
// Project / Education, all in one sheet). Requires the sheet's sharing
// setting to be "Anyone with the link can view".
const SHEET_ID = '1cfbNbcYkw_frbhe-Jgq8OJLi9DKR0YOvxz4XvBs3Qtw';
const SHEET_GID = '0';
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

const REFRESH_INTERVAL_MS = 5 * 60 * 1000; // re-poll every 5 minutes while a page using it is open

function splitBullets(rawDescription) {
    return rawDescription
        .split(/\r?\n/)
        .flatMap((line) => line.split('|'))
        .map((line) => line.trim())
        .filter(Boolean);
}

function rowsToEntries(rows) {
    const [header, ...body] = rows;
    if (!header) {
        return [];
    }

    const columnIndex = (name) =>
        header.findIndex((cell) => cell.trim().toLowerCase() === name.toLowerCase());

    const indices = {
        section: columnIndex('Section'),
        title: columnIndex('Title'),
        org: columnIndex('Company/Org'),
        location: columnIndex('Location'),
        startDate: columnIndex('Start Date'),
        endDate: columnIndex('End Date'),
        description: columnIndex('Description'),
        link: columnIndex('Project Link'),
    };

    const get = (row, key) => {
        const idx = indices[key];
        return idx === -1 || idx == null ? '' : (row[idx] || '').trim();
    };

    return body
        .map((row) => {
            const link = get(row, 'link');
            return {
                section: get(row, 'section').toLowerCase(),
                title: get(row, 'title'),
                org: get(row, 'org'),
                location: get(row, 'location'),
                startDate: get(row, 'startDate'),
                endDate: get(row, 'endDate'),
                bullets: splitBullets(get(row, 'description')),
                link: link && link.toLowerCase() !== 'nan' ? link : null,
            };
        })
        .filter((entry) => entry.title);
}

const ResumeSheetContext = createContext(null);

export function ResumeSheetProvider({ children }) {
    const [state, setState] = useState({
        status: 'loading',
        source: 'loading',
        experience: fallbackExperience,
        projects: fallbackProjects,
        education: fallbackEducation,
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
                const entries = rowsToEntries(rows);
                setState({
                    status: 'ready',
                    source: 'live',
                    experience: entries.filter((e) => e.section === 'experience'),
                    projects: entries.filter((e) => e.section === 'project'),
                    education: entries.filter((e) => e.section === 'education'),
                    error: null,
                    updatedAt: new Date(),
                });
            })
            .catch((err) => {
                setState((prev) => ({
                    ...prev,
                    status: 'error',
                    source: 'fallback',
                    experience: fallbackExperience,
                    projects: fallbackProjects,
                    education: fallbackEducation,
                    error: err.message,
                }));
            });
    }, []);

    useEffect(() => {
        load();
        const interval = setInterval(load, REFRESH_INTERVAL_MS);
        return () => clearInterval(interval);
    }, [load]);

    return (
        <ResumeSheetContext.Provider value={{ ...state, refresh: load }}>
            {children}
        </ResumeSheetContext.Provider>
    );
}

export function useResumeSheet() {
    const ctx = useContext(ResumeSheetContext);
    if (!ctx) {
        throw new Error('useResumeSheet must be used within a ResumeSheetProvider');
    }
    return ctx;
}
