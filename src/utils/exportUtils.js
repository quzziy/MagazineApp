import * as XLSX from 'xlsx';

const COLUMNS = [
  { key: 'titel', label: 'Titel' },
  { key: 'ausgabe', label: 'Ausgabe' },
  { key: 'erscheinungsdatum', label: 'Erscheinungsdatum' },
  { key: 'einkaufspreis', label: 'Einkaufspreis (€)' },
  { key: 'verkaufspreis', label: 'Verkaufspreis (€)' },
  { key: 'menge', label: 'Menge' },
  { key: 'zustand', label: 'Zustand' },
  { key: 'beschreibung', label: 'Beschreibung' },
  { key: 'tags', label: 'Tags' },
  { key: 'seo_titel', label: 'SEO-Titel' },
  { key: 'seo_beschreibung', label: 'SEO-Beschreibung' },
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

// --- Shopify Product CSV Export ---

function slugify(text) {
  return (text ?? '')
    .toLowerCase()
    .replace(/[äöü]/g, (c) => ({ ä: 'ae', ö: 'oe', ü: 'ue' }[c]))
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildDescription(mag) {
  if (mag.beschreibung) return mag.beschreibung;
  const parts = [];
  if (mag.titel) parts.push(`<strong>${mag.titel}</strong>`);
  if (mag.ausgabe) parts.push(mag.ausgabe);
  if (mag.erscheinungsdatum) parts.push(mag.erscheinungsdatum);
  if (mag.zustand) parts.push(`Zustand: ${mag.zustand}`);
  return parts.length ? `<p>${parts.join(' — ')}</p>` : '';
}

export function exportToShopify(magazines) {
  // Shopify product import CSV format
  // https://help.shopify.com/en/manual/products/import-export/using-csv
  const headers = [
    'Handle',
    'Title',
    'Body (HTML)',
    'Vendor',
    'Type',
    'Tags',
    'Published',
    'Option1 Name',
    'Option1 Value',
    'Variant SKU',
    'Variant Inventory Qty',
    'Variant Inventory Policy',
    'Variant Fulfillment Service',
    'Variant Price',
    'Variant Compare At Price',
    'Variant Requires Shipping',
    'Variant Taxable',
    'SEO Title',
    'SEO Description',
    'Status',
    'Metafield: custom.ausgabe [single_line_text_field]',
    'Metafield: custom.erscheinungsdatum [date]',
    'Metafield: custom.zustand [single_line_text_field]',
    'Metafield: custom.einkaufspreis [number_decimal]',
  ];

  const rows = magazines.map((mag) => {
    const handle = slugify(`${mag.titel ?? 'magazin'}-${mag.ausgabe ?? mag.erscheinungsdatum ?? mag.id}`);
    const tags = mag.tags ?? '';
    const allTags = [tags, 'Vintage', 'Magazin'].filter(Boolean).join(', ');

    return [
      handle,
      mag.titel ?? '',
      buildDescription(mag),
      'Vintage Magazine Shop',
      'Magazin',
      allTags,
      'TRUE',
      'Title',
      'Default Title',
      `MAG-${mag.id}`,
      mag.menge ?? 0,
      'deny',
      'manual',
      mag.verkaufspreis ?? '',
      mag.einkaufspreis ?? '',
      'TRUE',
      'TRUE',
      mag.seo_titel ?? mag.titel ?? '',
      mag.seo_beschreibung ?? '',
      'active',
      mag.ausgabe ?? '',
      mag.erscheinungsdatum ?? '',
      mag.zustand ?? '',
      mag.einkaufspreis ?? '',
    ];
  });

  const csvLines = [headers, ...rows].map((row) =>
    row
      .map((cell) => {
        const str = String(cell ?? '');
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      })
      .join(',')
  );

  downloadFile(csvLines.join('\n'), 'shopify-produkte.csv', 'text/csv;charset=utf-8;');
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
