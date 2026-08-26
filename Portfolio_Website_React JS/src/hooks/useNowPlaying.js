import { useCallback, useEffect, useState } from 'react';

const REFRESH_INTERVAL_MS = 3 * 60 * 1000; // re-poll every 3 minutes while the page is open

export function useNowPlaying() {
    const [state, setState] = useState({ status: 'loading', data: null, error: null });

    const load = useCallback(() => {
        setState((prev) => ({ ...prev, status: 'loading' }));

        fetch('/api/now-playing')
            .then((res) => {
                // No serverless function is running behind this URL - either a
                // real 404 (deployed without the function), or (in local CRA
                // dev, which has no /api routes at all) the SPA's index.html
                // served as a fallback for the unmatched route.
                const contentType = res.headers.get('content-type') || '';
                if (res.status === 404 || !contentType.includes('application/json')) {
                    throw new Error('not-configured');
                }
                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (data.error) {
                    throw new Error(data.error);
                }
                setState({ status: 'ready', data, error: null });
            })
            .catch((err) => {
                setState({
                    status: err.message === 'not-configured' ? 'not-configured' : 'error',
                    data: null,
                    error: err.message,
                });
            });
    }, []);

    useEffect(() => {
        load();
        const interval = setInterval(load, REFRESH_INTERVAL_MS);
        return () => clearInterval(interval);
    }, [load]);

    return { ...state, refresh: load };
}
