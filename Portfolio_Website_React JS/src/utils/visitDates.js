// The sheet's Date column has no year ("24-Aug"). The Never-Ending Pasta Pass
// ran Aug 24 - Nov 22, 2026, so every visit falls in this year.
export const PASS_YEAR = 2026;

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function monthIndex(token) {
    const prefix = token.trim().slice(0, 3).toLowerCase();
    return MONTHS.findIndex((name) => name.slice(0, 3).toLowerCase() === prefix);
}

// Accepts the sheet's "24-Aug" form as well as "Aug 24".
export function parseVisitDate(raw) {
    const text = String(raw || '').trim();
    const dayFirst = text.match(/^(\d{1,2})[\s-]+([A-Za-z]+)$/);
    const monthFirst = text.match(/^([A-Za-z]+)[\s-]+(\d{1,2})$/);

    let day;
    let month;
    if (dayFirst) {
        day = Number(dayFirst[1]);
        month = monthIndex(dayFirst[2]);
    } else if (monthFirst) {
        day = Number(monthFirst[2]);
        month = monthIndex(monthFirst[1]);
    } else {
        return null;
    }

    if (month < 0 || day < 1 || day > 31) {
        return null;
    }

    const date = new Date(PASS_YEAR, month, day);
    return {
        day,
        weekday: WEEKDAYS[date.getDay()],
        monthKey: `${PASS_YEAR}-${String(month + 1).padStart(2, '0')}`,
        monthLabel: `${MONTHS[month]} ${PASS_YEAR}`,
        sortValue: date.getTime(),
    };
}
