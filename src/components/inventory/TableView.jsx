import { useState } from 'react';
import { ChevronUp, ChevronDown, Pencil, Trash2 } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatUtils';

const COLUMNS = [
  { key: 'titel', label: 'Titel' },
  { key: 'ausgabe', label: 'Ausgabe' },
  { key: 'erscheinungsdatum', label: 'Datum', hidden: 'sm' },
  { key: 'einkaufspreis', label: 'Einkauf', hidden: 'md' },
  { key: 'verkaufspreis', label: 'Verkauf', hidden: 'md' },
  { key: 'menge', label: 'Bestand' },
];

export function TableView({ magazines, onEdit, onDelete }) {
  const [sort, setSort] = useState({ key: 'titel', dir: 'asc' });

  function toggleSort(key) {
    setSort((prev) =>
      prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }
    );
  }

  const sorted = [...magazines].sort((a, b) => {
    const va = a[sort.key] ?? '';
    const vb = b[sort.key] ?? '';
    const cmp = typeof va === 'number' ? va - vb : String(va).localeCompare(String(vb), 'de');
    return sort.dir === 'asc' ? cmp : -cmp;
  });

  function SortIcon({ colKey }) {
    if (sort.key !== colKey) return <ChevronUp size={13} className="text-gray-300" />;
    return sort.dir === 'asc' ? (
      <ChevronUp size={13} className="text-brand-500" />
    ) : (
      <ChevronDown size={13} className="text-brand-500" />
    );
  }

  const thBase =
    'whitespace-nowrap px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 cursor-pointer select-none hover:text-gray-800';

  const hiddenClass = { sm: 'hidden sm:table-cell', md: 'hidden md:table-cell' };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-100">
        <thead className="bg-gray-50">
          <tr>
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                onClick={() => toggleSort(col.key)}
                className={`${thBase}${col.hidden ? ` ${hiddenClass[col.hidden]}` : ''}`}
              >
                <span className="flex items-center gap-1">
                  {col.label}
                  <SortIcon colKey={col.key} />
                </span>
              </th>
            ))}
            <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
              Aktionen
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 bg-white">
          {sorted.map((mag) => (
            <tr key={mag.id} className="hover:bg-gray-50/60">
              <td className="px-3 py-3 text-sm font-medium text-gray-900">{mag.titel}</td>
              <td className="px-3 py-3 text-sm text-gray-600">{mag.ausgabe ?? '—'}</td>
              <td className="hidden px-3 py-3 text-sm text-gray-600 sm:table-cell">
                {formatDate(mag.erscheinungsdatum)}
              </td>
              <td className="hidden px-3 py-3 text-sm text-gray-600 md:table-cell">
                {formatCurrency(mag.einkaufspreis)}
              </td>
              <td className="hidden px-3 py-3 text-sm text-gray-600 md:table-cell">
                {formatCurrency(mag.verkaufspreis)}
              </td>
              <td className="px-3 py-3 text-sm text-gray-900">
                <div className="flex items-center gap-1.5">
                  <span>{mag.menge ?? 0}</span>
                  {mag.menge != null && mag.menge < 5 && (
                    <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700">
                      Niedrig
                    </span>
                  )}
                </div>
              </td>
              <td className="px-3 py-3 text-right">
                <div className="flex justify-end gap-1">
                  <button
                    onClick={() => onEdit(mag)}
                    className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-brand-500"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => onDelete(mag)}
                    className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
