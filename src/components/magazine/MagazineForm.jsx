import { useState } from 'react';

const EMPTY = {
  titel: '',
  ausgabe: '',
  erscheinungsdatum: '',
  einkaufspreis: '',
  verkaufspreis: '',
  menge: '',
};

export function MagazineForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial ?? EMPTY);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      ...form,
      einkaufspreis: form.einkaufspreis !== '' ? parseFloat(form.einkaufspreis) : null,
      verkaufspreis: form.verkaufspreis !== '' ? parseFloat(form.verkaufspreis) : null,
      menge: form.menge !== '' ? parseInt(form.menge, 10) : 0,
    });
  }

  const inputClass =
    'w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100';
  const labelClass = 'block text-xs font-medium text-gray-600 mb-1';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass}>Titel *</label>
          <input
            name="titel"
            value={form.titel}
            onChange={handleChange}
            required
            placeholder="z.B. Vogue"
            className={inputClass}
          />
        </div>

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

        <div className="sm:col-span-2">
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
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100"
        >
          Abbrechen
        </button>
        <button
          type="submit"
          className="flex-1 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 active:bg-brand-700"
        >
          Speichern
        </button>
      </div>
    </form>
  );
}
