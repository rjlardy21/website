import React from 'react';

function StatTile({ icon, label, value, hint }) {
    return (
        <div className="stat-tile">
            <i className={icon}></i>
            <div className="stat-tile-value">{value}</div>
            <div className="stat-tile-label">{label}</div>
            {hint && <div className="stat-tile-hint">{hint}</div>}
        </div>
    );
}

export default StatTile;
