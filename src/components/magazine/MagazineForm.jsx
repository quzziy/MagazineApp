import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const EMPTY = {
  titel: '',
  ausgabe: '',
  erscheinungsdatum: '',
  einkaufspreis: '',
  verkaufspreis: '',
  menge: '',
};

export function MagazineForm({ initial, onSubmit, onSaveAndNext, onCancel }) {
  const [form, setForm] = useState(initial ?? EMPTY);
  const [showDetails, setShowDetails] = useState(Boolean(initial));
  const isAddMode = !initial;
  const titelRef = useRef(null);

  useEffect(() => {
    titelRef.current?.focus();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function parse() {
    return {
      ...form,
      einkaufspreis: form.einkaufspreis !== '' ? parseFloat(form.einkaufspreis) : null,
      verkaufspreis: form.verkaufspreis !== '' ? parseFloat(form.verkaufspreis) : null,
      menge: form.menge !== '' ? parseInt(form.menge, 10) : 0,
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(parse());
  }

  function handleSaveAndNext(e) {
    e.preventDefault();
    if (!form.titel.trim()) {
      titelRef.current?.focus();
      return;
    }
    onSaveAndNext(parse());
  }

  const inputClass =
    'w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100';
  const labelClass = 'block text-xs font-medium text-gray-500 mb-1';

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Pflichtfelder — immer sichtbar */}
      <div>
        <label className={labelClass}>Titel *</label>
        <input
          ref={titelRef}
          name="titel"
          value={form.titel}
          onChange={handleChange}
          required
          placeholder="z.B. Vogue"
          className={inputClass}
          autoComplete="off"
        />
      </div>

      <div>
        <label className={labelClass}>Erscheinungsdatum</label>
        <input
          name="erscheinungsdatum"
          type="date"
          value={form.erscheinungsdatum}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Lagerbestand (Stück) *</label>
        <input
          name="menge"
          type="number"
          step="1"
          min="0"
          value={form.menge}
          onChange={handleChange}
          required
          placeholder="0"
          className={inputClass}
        />
      </div>

      {/* Weitere Details Toggle */}
      <button
        type="button"
        onClick={() => setShowDetails((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg border border-dashed border-gray-200 px-3 py-2.5 text-sm text-gray-500 hover:border-gray-300 hover:text-gray-700"
      >
        <span>Weitere Details</span>
        {showDetails ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>

      {showDetails && (
        <div className="space-y-3 rounded-xl border border-gray-100 bg-gray-50 p-3">
          <div>
            <label className={labelClass}>Ausgabe / Nummer</label>
            <input
              name="ausgabe"
              value={form.ausgabe}
              onChange={handleChange}
              placeholder="z.B. 3/2025"
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Einkaufspreis (€)</label>
              <input
                name="einkaufspreis"
                type="number"
                step="0.01"
                min="0"
                value={form.einkaufspreis}
                onChange={handleChange}
                placeholder="0,00"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Verkaufspreis (€)</label>
              <input
                name="verkaufspreis"
                type="number"
                step="0.01"
                min="0"
                value={form.verkaufspreis}
                onChange={handleChange}
                placeholder="0,00"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      {isAddMode ? (
        <div className="space-y-2 pt-1">
          <button
            type="button"
            onClick={handleSaveAndNext}
            className="w-full rounded-xl bg-brand-500 py-3.5 text-base font-semibold text-white hover:bg-brand-600 active:bg-brand-700"
          >
            Speichern &amp; Nächstes
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl border border-brand-500 py-3 text-sm font-medium text-brand-600 hover:bg-brand-50"
            >
              Speichern &amp; Schließen
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Abbrechen
          </button>
          <button
            type="submit"
            className="flex-1 rounded-xl bg-brand-500 py-3 text-sm font-medium text-white hover:bg-brand-600"
          >
            Speichern
          </button>
        </div>
      )}
    </form>
  );
}
