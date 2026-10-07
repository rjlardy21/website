// "just now", "23 minutes ago", "3 hours ago", "2 days ago" - deliberately
// coarse, so visitors see how long ago something happened but never an exact
// timestamp.
export function timeAgo(isoString, now = Date.now()) {
    const then = new Date(isoString).getTime();
    if (Number.isNaN(then)) {
        return null;
    }

    const seconds = Math.max(0, Math.round((now - then) / 1000));
    if (seconds < 60) {
        return 'just now';
    }

    const units = [
        ['day', 86400],
        ['hour', 3600],
        ['minute', 60],
    ];
    for (const [name, size] of units) {
        if (seconds >= size) {
            const count = Math.floor(seconds / size);
            return `${count} ${name}${count === 1 ? '' : 's'} ago`;
        }
    }
    return null;
}
