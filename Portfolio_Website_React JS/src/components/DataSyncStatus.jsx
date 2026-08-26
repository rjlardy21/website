import React from 'react';

function DataSyncStatus({ status, error, updatedAt, refresh }) {
    return (
        <div className="data-status">
            {status === 'loading' && <span>Syncing with the sheet&hellip;</span>}
            {status === 'ready' && (
                <span>
                    <i className="fas fa-circle status-dot status-dot-live"></i>
                    Live &mdash; last synced {updatedAt.toLocaleTimeString()}
                </span>
            )}
            {status === 'error' && (
                <span>
                    <i className="fas fa-circle status-dot status-dot-offline"></i>
                    Couldn&apos;t reach the sheet ({error}) &mdash; showing last known data
                </span>
            )}
            <button type="button" className="refresh-btn" onClick={refresh}>
                <i className="fas fa-rotate"></i> Refresh
            </button>
        </div>
    );
}

export default DataSyncStatus;
