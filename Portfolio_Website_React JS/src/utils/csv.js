// Minimal CSV parser: handles quoted fields, escaped "" quotes, embedded
// commas, and embedded newlines within a quoted field (e.g. a multi-line
// bullet-point description cell from Google Sheets) - a naive split-on-"\n"
// approach would incorrectly break a single record into multiple rows.

export function parseCsv(text) {
    const rows = [];
    let row = [];
    let field = '';
    let inQuotes = false;
    let i = 0;
    const len = text.length;

    while (i < len) {
        const char = text[i];

        if (inQuotes) {
            if (char === '"') {
                if (text[i + 1] === '"') {
                    field += '"';
                    i += 2;
                } else {
                    inQuotes = false;
                    i += 1;
                }
            } else {
                field += char;
                i += 1;
            }
            continue;
        }

        if (char === '"') {
            inQuotes = true;
            i += 1;
        } else if (char === ',') {
            row.push(field);
            field = '';
            i += 1;
        } else if (char === '\r' && text[i + 1] === '\n') {
            row.push(field);
            rows.push(row);
            row = [];
            field = '';
            i += 2;
        } else if (char === '\n' || char === '\r') {
            row.push(field);
            rows.push(row);
            row = [];
            field = '';
            i += 1;
        } else {
            field += char;
            i += 1;
        }
    }

    if (field.length > 0 || row.length > 0) {
        row.push(field);
        rows.push(row);
    }

    return rows.filter((r) => !(r.length === 1 && r[0].trim() === ''));
}
