import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useMagazines } from '../../hooks/useMagazines';
import { useDebounce } from '../../hooks/useDebounce';
import { addMagazine, updateMagazine, deleteMagazine } from '../../db/db';
import { Toolbar } from '../toolbar/Toolbar';
import { TableView } from './TableView';
import { CardView } from './CardView';
import { EmptyState } from '../layout/EmptyState';
import { MagazineModal } from '../magazine/MagazineModal';

export function InventoryPage({ viewMode, onAdd }) {
  const magazines = useMagazines();

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ nurVerfuegbar: false, minPreis: '', maxPreis: '' });
  const [modal, setModal] = useState({ open: false, magazine: null });

  const debouncedQuery = useDebounce(searchQuery);

  const filtered = useMemo(() => {
    if (!magazines) return [];
    return magazines.filter((m) => {
      if (debouncedQuery) {
        const q = debouncedQuery.toLowerCase();
        const matchTitel = m.titel?.toLowerCase().includes(q);
        const matchAusgabe = m.ausgabe?.toLowerCase().includes(q);
        if (!matchTitel && !matchAusgabe) return false;
      }
      if (filters.nurVerfuegbar && !(m.menge > 0)) return false;
      if (filters.minPreis !== '' && m.verkaufspreis != null && m.verkaufspreis < parseFloat(filters.minPreis)) return false;
      if (filters.maxPreis !== '' && m.verkaufspreis != null && m.verkaufspreis > parseFloat(filters.maxPreis)) return false;
      return true;
    });
  }, [magazines, debouncedQuery, filters]);

  function openAdd() {
    setModal({ open: true, magazine: null });
  }

  function openEdit(magazine) {
    setModal({ open: true, magazine });
  }

  function closeModal() {
    setModal({ open: false, magazine: null });
  }

  async function handleSubmit(data) {
    if (modal.magazine) {
      await updateMagazine(modal.magazine.id, data);
    } else {
      await addMagazine(data);
    }
    closeModal();
  }

  async function handleDelete(magazine) {
    if (window.confirm(`"${magazine.titel}" wirklich löschen?`)) {
      await deleteMagazine(magazine.id);
    }
  }

  const hasFilters = debouncedQuery || filters.nurVerfuegbar || filters.minPreis || filters.maxPreis;
  const isLoading = magazines === undefined;

  return (
    <div className="flex flex-1 flex-col">
      <Toolbar
        magazines={filtered}
        onSearch={setSearchQuery}
        onFilter={setFilters}
        onAdd={openAdd}
      />

      <div className="flex-1">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState hasFilters={Boolean(hasFilters)} onAdd={openAdd} />
        ) : viewMode === 'table' ? (
          <TableView magazines={filtered} onEdit={openEdit} onDelete={handleDelete} />
        ) : (
          <CardView magazines={filtered} onEdit={openEdit} onDelete={handleDelete} />
        )}
      </div>

      {/* Mobile FAB */}
      <button
        onClick={openAdd}
        className="fixed bottom-5 right-5 flex items-center justify-center rounded-full bg-brand-500 p-4 text-white shadow-lg hover:bg-brand-600 active:bg-brand-700 sm:hidden"
        aria-label="Magazin hinzufügen"
      >
        <Plus size={22} />
      </button>

      <MagazineModal
        open={modal.open}
        magazine={modal.magazine}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
