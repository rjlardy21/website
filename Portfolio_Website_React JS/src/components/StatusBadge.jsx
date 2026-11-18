import React from 'react';
import { OPEN_TO_WORK, OPEN_TO_WORK_LABEL } from '../data/status';

function StatusBadge({ className = '' }) {
    if (!OPEN_TO_WORK) return null;
    return (
        <span className={`status-badge ${className}`.trim()}>
            <span className="status-dot" aria-hidden="true"></span>
            {OPEN_TO_WORK_LABEL}
        </span>
    );
}

export default StatusBadge;
