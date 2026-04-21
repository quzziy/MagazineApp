import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { MagazineForm } from './MagazineForm';

export function MagazineModal({ open, magazine, onClose, onSubmit }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleCancel = (e) => {
      e.preventDefault();
      onClose();
    };
    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  const title = magazine ? 'Magazin bearbeiten' : 'Magazin hinzufügen';

  const initial = magazine
    ? {
        titel: magazine.titel ?? '',
        ausgabe: magazine.ausgabe ?? '',
        erscheinungsdatum: magazine.erscheinungsdatum ?? '',
        einkaufspreis: magazine.einkaufspreis ?? '',
        verkaufspreis: magazine.verkaufspreis ?? '',
        menge: magazine.menge ?? '',
      }
    : undefined;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-0 h-full w-full max-w-none overflow-y-auto bg-transparent p-0 backdrop:bg-black/40 sm:m-auto sm:h-auto sm:max-h-[90vh] sm:w-full sm:max-w-lg sm:rounded-2xl"
    >
      <div className="min-h-full bg-white p-6 sm:min-h-0 sm:rounded-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        {open && (
          <MagazineForm
            key={magazine?.id ?? 'new'}
            initial={initial}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        )}
      </div>
    </dialog>
  );
}
