import { useState } from 'react';
import { SlidersHorizontal, Plus } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { FilterPanel } from './FilterPanel';
import { ExportButton } from './ExportButton';

const DEFAULT_FILTERS = {
  nurVerfuegbar: false,
  minPreis: '',
  maxPreis: '',
};

export function Toolbar({ magazines, onSearch, onFilter, onAdd }) {
  const [query, setQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  function handleSearch(val) {
    setQuery(val);
    onSearch(val);
  }

  function handleFilter(val) {
    setFilters(val);
    onFilter(val);
  }

  const activeFilters = filters.nurVerfuegbar || filters.minPreis || filters.maxPreis;

  return (
    <div className="border-b border-gray-100 bg-white">
      <div className="flex items-center gap-2 px-4 py-3">
        <SearchBar value={query} onChange={handleSearch} />

        <button
          onClick={() => setShowFilter((v) => !v)}
          className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
            activeFilters
              ? 'border-brand-500 bg-brand-50 text-brand-600'
              : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <SlidersHorizontal size={15} />
          <span className="hidden sm:inline">Filter</span>
        </button>

        <ExportButton magazines={magazines} />

        <button
          onClick={onAdd}
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-2.5 text-sm font-medium text-white hover:bg-brand-600 active:bg-brand-700"
        >
          <Plus size={15} />
          <span className="hidden sm:inline">Hinzufügen</span>
        </button>
      </div>

      {showFilter && <FilterPanel filters={filters} onChange={handleFilter} />}
    </div>
  );
}
