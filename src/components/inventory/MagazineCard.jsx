import { Pencil, Trash2 } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatUtils';

export function MagazineCard({ magazine, onEdit, onDelete }) {
  const isLowStock = magazine.menge != null && magazine.menge < 5;

  return (
    <div className="relative rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="absolute right-3 top-3 flex gap-1">
        <button
          onClick={() => onEdit(magazine)}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-brand-500"
        >
          <Pencil size={15} />
        </button>
        <button
          onClick={() => onDelete(magazine)}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 size={15} />
        </button>
      </div>

      <div className="pr-16">
        <p className="font-semibold text-gray-900 leading-tight">{magazine.titel}</p>
        {magazine.ausgabe && (
          <p className="mt-0.5 text-xs text-gray-500">{magazine.ausgabe}</p>
        )}
        {magazine.erscheinungsdatum && (
          <p className="mt-0.5 text-xs text-gray-400">{formatDate(magazine.erscheinungsdatum)}</p>
        )}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-gray-50 pt-3">
        <div>
          <p className="text-xs text-gray-400">Einkauf</p>
          <p className="text-sm font-medium text-gray-700">{formatCurrency(magazine.einkaufspreis)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Verkauf</p>
          <p className="text-sm font-medium text-gray-700">{formatCurrency(magazine.verkaufspreis)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Bestand</p>
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-medium text-gray-700">{magazine.menge ?? 0}</p>
            {isLowStock && (
              <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700">
                Niedrig
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
