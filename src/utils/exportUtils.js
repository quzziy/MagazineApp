import * as XLSX from 'xlsx';

const COLUMNS = [
  { key: 'titel', label: 'Titel' },
  { key: 'ausgabe', label: 'Ausgabe' },
  { key: 'erscheinungsdatum', label: 'Erscheinungsdatum' },
  { key: 'einkaufspreis', label: 'Einkaufspreis (€)' },
  { key: 'verkaufspreis', label: 'Verkaufspreis (€)' },
  { key: 'menge', label: 'Menge' },
];

function toRows(magazines) {
  return magazines.map((m) =>
    COLUMNS.reduce((row, col) => {
      row[col.label] = m[col.key] ?? '';
      return row;
    }, {})
  );
}

export function exportToCSV(magazines) {
  const rows = toRows(magazines);
  const ws = XLSX.utils.json_to_sheet(rows);
  const csv = XLSX.utils.sheet_to_csv(ws);
  downloadFile(csv, 'magazin-inventar.csv', 'text/csv;charset=utf-8;');
}

export function exportToExcel(magazines) {
  const rows = toRows(magazines);
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Inventar');
  XLSX.writeFile(wb, 'magazin-inventar.xlsx');
}

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
