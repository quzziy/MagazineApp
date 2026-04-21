import { BookOpen } from 'lucide-react';

export function EmptyState({ hasFilters, onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="mb-4 rounded-2xl bg-gray-100 p-4">
        <BookOpen size={32} className="text-gray-400" />
      </div>
      {hasFilters ? (
        <>
          <p className="font-medium text-gray-700">Keine Ergebnisse</p>
          <p className="mt-1 text-sm text-gray-400">Versuche andere Suchbegriffe oder Filter.</p>
        </>
      ) : (
        <>
          <p className="font-medium text-gray-700">Noch keine Magazine</p>
          <p className="mt-1 text-sm text-gray-400">Füge dein erstes Magazin hinzu.</p>
          <button
            onClick={onAdd}
            className="mt-4 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
          >
            Magazin hinzufügen
          </button>
        </>
      )}
    </div>
  );
}
