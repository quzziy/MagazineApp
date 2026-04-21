export function formatCurrency(value) {
  if (value == null || value === '') return '—';
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
}

export function formatDate(isoString) {
  if (!isoString) return '—';
  return new Intl.DateTimeFormat('de-DE').format(new Date(isoString));
}
