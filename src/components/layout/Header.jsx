import { List, LayoutGrid, Settings } from 'lucide-react';

export function Header({ viewMode, onViewChange, onSettingsOpen }) {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3.5">
        <div>
          <h1 className="text-base font-semibold text-gray-900">Magazin-Inventar</h1>
          <p className="text-xs text-gray-400">Mode &amp; Lifestyle</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-0.5">
            <button
              onClick={() => onViewChange('table')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List size={14} />
              Tabelle
            </button>
            <button
              onClick={() => onViewChange('card')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                viewMode === 'card'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <LayoutGrid size={14} />
              Karten
            </button>
          </div>

          <button
            onClick={onSettingsOpen}
            title="Einstellungen"
            className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            <Settings size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
