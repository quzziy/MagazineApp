export function FilterPanel({ filters, onChange }) {
  function set(key, value) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 px-4 py-3">
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={filters.nurVerfuegbar}
          onChange={(e) => set('nurVerfuegbar', e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
        />
        <span className="text-sm text-gray-700">Nur verfügbar (Bestand &gt; 0)</span>
      </label>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 whitespace-nowrap">Preis von</span>
        <input
          type="number"
          min="0"
          step="0.01"
          value={filters.minPreis}
          onChange={(e) => set('minPreis', e.target.value)}
          placeholder="0,00"
          className="w-24 rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
        <span className="text-sm text-gray-500">bis</span>
        <input
          type="number"
          min="0"
          step="0.01"
          value={filters.maxPreis}
          onChange={(e) => set('maxPreis', e.target.value)}
          placeholder="999,00"
          className="w-24 rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
        <span className="text-sm text-gray-500">€</span>
      </div>
    </div>
  );
}
