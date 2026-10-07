// Last-known snapshot of Alex's "pastapass" Google Sheet, used only if the live
// fetch fails. Ask to have this refreshed whenever you want it current.
// Source: https://docs.google.com/spreadsheets/d/1MoHaOUgwANQGme-gn76gjv-zfgnqdXGjLJD0p-PiEg4
// Snapshot taken Oct 6, 2026.

export const startingWeight = 165;

// What most visits have in common; each visit below overrides only what differs.
const usual = {
    visits: 1,
    location: 'Bloomington',
    pastaType: 'Rigatoni',
    sauce: '5 cheese marinara',
    protein: 'Chicken Fritta',
    soup: '1 - Zuppa Tuscana',
    timesRecognized: 0,
    weight: null,
};

export const visits = [
    { ...usual, date: '24-Aug', breadsticks: 4, pctBowlsConsumed: 60, protein: 'none', bowlsOrdered: 2, withWho: 'alone', weight: 170.5 },
    { ...usual, date: '25-Aug', breadsticks: 4, soup: '2- Zuppa Tuscana', pctBowlsConsumed: 50, bowlsOrdered: 1, withWho: 'alone', weight: 167.7 },
    { ...usual, date: '26-Aug', breadsticks: 3, pctBowlsConsumed: 50, sauce: '5 cheese marianara', bowlsOrdered: 2, timesRecognized: 1, withWho: 'Reece', weight: 166.8 },
    { ...usual, date: '2-Sep', breadsticks: 4, pctBowlsConsumed: 50, bowlsOrdered: 1, withWho: 'alone', weight: 163.4 },
    { ...usual, date: '3-Sep', breadsticks: 3, pctBowlsConsumed: 80, bowlsOrdered: 2, withWho: 'Jason from work', weight: 167.4 },
    { ...usual, date: '4-Sep', breadsticks: 3, soup: '1- Zuppa Tuscana', pctBowlsConsumed: 85, bowlsOrdered: 1, withWho: 'mother' },
    { ...usual, date: '14-Sep', breadsticks: 3, pctBowlsConsumed: 70, bowlsOrdered: 2, timesRecognized: 1, withWho: 'alone' },
    { ...usual, date: '21-Sep', breadsticks: 2, soup: '1- Zuppa Tuscana', pctBowlsConsumed: 75, bowlsOrdered: 2, withWho: 'alone', weight: 166.6 },
    { ...usual, date: '28-Sep', breadsticks: 3, soup: '1- Zuppa Tuscana', pctBowlsConsumed: 75, protein: 'Meatballs', bowlsOrdered: 2, timesRecognized: 1, withWho: 'alone' },
    { ...usual, date: '29-Sep', breadsticks: 3, soup: '1- Zuppa Tuscana', pctBowlsConsumed: 85, bowlsOrdered: 1, timesRecognized: 1, withWho: 'alone' },
    { ...usual, date: '30-Sep', location: 'Golden Valley', breadsticks: 3, soup: '1- Zuppa Tuscana', pctBowlsConsumed: 85, bowlsOrdered: 2, withWho: 'Reece & John', weight: 168 },
];
