import { useEffect, useRef, useState } from 'react';
import { X, Check } from 'lucide-react';
import { MagazineForm } from './MagazineForm';

export function MagazineModal({ open, magazine, onClose, onSubmit }) {
  const dialogRef = useRef(null);
  const [formKey, setFormKey] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [flash, setFlash] = useState(false);
  const isAddMode = !magazine;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
      setSavedCount(0);
      setFormKey(0);
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

  async function handleSaveAndNext(data) {
    await onSubmit(data, true);
    setSavedCount((c) => c + 1);
    setFormKey((k) => k + 1);
    setFlash(true);
    setTimeout(() => setFlash(false), 1200);
  }

  async function handleSubmit(data) {
    await onSubmit(data, false);
  }

  const title = isAddMode ? 'Magazin hinzufügen' : 'Magazin bearbeiten';

  const initial = magazine
    ? {
        titel: magazine.titel ?? '',
        ausgabe: magazine.ausgabe ?? '',
        erscheinungsdatum: magazine.erscheinungsdatum ?? '',
        einkaufspreis: magazine.einkaufspreis ?? '',
        verkaufspreis: magazine.verkaufspreis ?? '',
        menge: magazine.menge ?? '',
        beschreibung: magazine.beschreibung ?? '',
        zustand: magazine.zustand ?? '',
        tags: magazine.tags ?? '',
        seo_titel: magazine.seo_titel ?? '',
        seo_beschreibung: magazine.seo_beschreibung ?? '',
      }
    : undefined;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-0 h-full w-full max-w-none overflow-y-auto bg-transparent p-0 backdrop:bg-black/40 sm:m-auto sm:h-auto sm:max-h-[90vh] sm:w-full sm:max-w-lg sm:rounded-2xl"
    >
      <div className="min-h-full bg-white p-5 sm:min-h-0 sm:rounded-2xl">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            {isAddMode && savedCount > 0 && (
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                {savedCount} gespeichert
              </span>
            )}
            {flash && (
              <span className="flex items-center gap-1 rounded-full bg-green-500 px-2.5 py-0.5 text-xs font-medium text-white">
                <Check size={11} />
                Gespeichert!
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {open && (
          <MagazineForm
            key={formKey}
            initial={initial}
            onSubmit={handleSubmit}
            onSaveAndNext={handleSaveAndNext}
            onCancel={onClose}
          />
        )}
      </div>
    </dialog>
  );
}
