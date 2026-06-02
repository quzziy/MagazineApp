import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { CoverScanner } from '../scan/CoverScanner';

const EMPTY = {
  titel: '',
  ausgabe: '',
  erscheinungsdatum: '',
  einkaufspreis: '',
  verkaufspreis: '',
  menge: '',
  beschreibung: '',
  zustand: '',
  tags: '',
  seo_titel: '',
  seo_beschreibung: '',
};

function isoToDE(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return d && m && y ? `${d}.${m}.${y}` : iso;
}

function deToISO(de) {
  if (!de) return '';
  const parts = de.split('.');
  if (parts.length === 3) {
    const [d, m, y] = parts;
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }
  return de;
}

function Section({ label, open, onToggle, children }) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-lg border border-dashed border-gray-200 px-3 py-2.5 text-sm text-gray-500 hover:border-gray-300 hover:text-gray-700"
      >
        <span>{label}</span>
        {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>
      {open && (
        <div className="mt-2 space-y-3 rounded-xl border border-gray-100 bg-gray-50 p-3">
          {children}
        </div>
      )}
    </div>
  );
}

export function MagazineForm({ initial, onSubmit, onSaveAndNext, onCancel }) {
  const [form, setForm] = useState(
    initial
      ? { ...EMPTY, ...initial, erscheinungsdatum: isoToDE(initial.erscheinungsdatum) }
      : EMPTY
  );
  const [showScan, setShowScan] = useState(false);
  const [showDetails, setShowDetails] = useState(Boolean(initial));
  const [showShopify, setShowShopify] = useState(Boolean(initial?.beschreibung || initial?.tags));
  const [showSeo, setShowSeo] = useState(Boolean(initial?.seo_titel || initial?.seo_beschreibung));
  const isAddMode = !initial;
  const titelRef = useRef(null);

  useEffect(() => {
    titelRef.current?.focus();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleScanResult(result) {
    setForm((prev) => ({
      ...prev,
      titel: result.titel || prev.titel,
      ausgabe: result.ausgabe || prev.ausgabe,
      erscheinungsdatum: result.erscheinungsdatum
        ? isoToDE(result.erscheinungsdatum)
        : prev.erscheinungsdatum,
      verkaufspreis:
        result.verkaufspreis != null ? String(result.verkaufspreis) : prev.verkaufspreis,
      beschreibung: result.beschreibung || prev.beschreibung,
      zustand: result.zustand || prev.zustand,
      tags: result.tags || prev.tags,
      seo_titel: result.seo_titel || prev.seo_titel,
      seo_beschreibung: result.seo_beschreibung || prev.seo_beschreibung,
    }));
    // Auto-expand sections that were filled by the scan
    setShowDetails(true);
    setShowShopify(true);
    if (result.seo_titel || result.seo_beschreibung) setShowSeo(true);
  }

  function parse() {
    return {
      ...form,
      erscheinungsdatum: deToISO(form.erscheinungsdatum),
      einkaufspreis: form.einkaufspreis !== '' ? parseFloat(form.einkaufspreis) : null,
      verkaufspreis: form.verkaufspreis !== '' ? parseFloat(form.verkaufspreis) : null,
      menge: form.menge !== '' ? parseInt(form.menge, 10) : 0,
      beschreibung: form.beschreibung || null,
      zustand: form.zustand || null,
      tags: form.tags || null,
      seo_titel: form.seo_titel || null,
      seo_beschreibung: form.seo_beschreibung || null,
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

  const inp =
    'w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100';
  const lbl = 'block text-xs font-medium text-gray-500 mb-1';

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* KI Cover-Scan */}
      <Section
        label={
          <span className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-violet-500" />
            Cover mit KI scannen
          </span>
        }
        open={showScan}
        onToggle={() => setShowScan((v) => !v)}
      >
        <CoverScanner onResult={handleScanResult} />
      </Section>

      {/* Pflichtfelder */}
      <div>
        <label className={lbl}>Titel *</label>
        <input
          ref={titelRef}
          name="titel"
          value={form.titel}
          onChange={handleChange}
          required
          placeholder="z.B. Vogue"
          className={inp}
          autoComplete="off"
        />
      </div>

      <div>
        <label className={lbl}>Erscheinungsdatum</label>
        <input
          name="erscheinungsdatum"
          type="text"
          inputMode="numeric"
          value={form.erscheinungsdatum}
          onChange={handleChange}
          placeholder="TT.MM.JJJJ"
          className={inp}
        />
      </div>

      <div>
        <label className={lbl}>Lagerbestand (Stück) *</label>
        <input
          name="menge"
          type="number"
          step="1"
          min="0"
          value={form.menge}
          onChange={handleChange}
          required
          placeholder="0"
          className={inp}
        />
      </div>

      {/* Preise & Details */}
      <Section
        label="Preise &amp; Details"
        open={showDetails}
        onToggle={() => setShowDetails((v) => !v)}
      >
        <div>
          <label className={lbl}>Ausgabe / Nummer</label>
          <input
            name="ausgabe"
            value={form.ausgabe}
            onChange={handleChange}
            placeholder="z.B. März 1995 oder 3/1995"
            className={inp}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={lbl}>Einkaufspreis (€)</label>
            <input
              name="einkaufspreis"
              type="number"
              step="0.01"
              min="0"
              value={form.einkaufspreis}
              onChange={handleChange}
              placeholder="0,00"
              className={inp}
            />
          </div>
          <div>
            <label className={lbl}>Verkaufspreis (€)</label>
            <input
              name="verkaufspreis"
              type="number"
              step="0.01"
              min="0"
              value={form.verkaufspreis}
              onChange={handleChange}
              placeholder="0,00"
              className={inp}
            />
          </div>
        </div>
        <div>
          <label className={lbl}>Zustand</label>
          <select name="zustand" value={form.zustand} onChange={handleChange} className={inp}>
            <option value="">— bitte wählen —</option>
            <option value="Sehr gut">Sehr gut</option>
            <option value="Gut">Gut</option>
            <option value="Akzeptabel">Akzeptabel</option>
          </select>
        </div>
      </Section>

      {/* Shopify Beschreibung & Tags */}
      <Section
        label="Beschreibung &amp; Tags (Shopify)"
        open={showShopify}
        onToggle={() => setShowShopify((v) => !v)}
      >
        <div>
          <label className={lbl}>Produktbeschreibung</label>
          <textarea
            name="beschreibung"
            value={form.beschreibung}
            onChange={handleChange}
            rows={4}
            placeholder="Beschreibung für den Shopify-Shop…"
            className={`${inp} resize-y leading-relaxed`}
          />
        </div>
        <div>
          <label className={lbl}>Tags (kommagetrennt)</label>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="z.B. Vogue, 1990er, Kate Moss, Mode"
            className={inp}
          />
        </div>
      </Section>

      {/* SEO */}
      <Section
        label="SEO-Felder"
        open={showSeo}
        onToggle={() => setShowSeo((v) => !v)}
      >
        <div>
          <label className={lbl}>
            SEO-Titel
            <span className="ml-1 text-gray-400">({form.seo_titel.length}/60)</span>
          </label>
          <input
            name="seo_titel"
            value={form.seo_titel}
            onChange={handleChange}
            maxLength={60}
            placeholder="z.B. Vogue März 1995 – Vintage Modemagazin"
            className={inp}
          />
        </div>
        <div>
          <label className={lbl}>
            SEO-Beschreibung
            <span className="ml-1 text-gray-400">({form.seo_beschreibung.length}/155)</span>
          </label>
          <textarea
            name="seo_beschreibung"
            value={form.seo_beschreibung}
            onChange={handleChange}
            maxLength={155}
            rows={3}
            placeholder="Kurze Meta-Beschreibung für Suchmaschinen…"
            className={`${inp} resize-none leading-relaxed`}
          />
        </div>
      </Section>

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
