import { useEffect, useRef, useState } from 'react';
import { X, Key, Store, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { getApiKey, setApiKey, getShopName, setShopName } from '../../services/claudeService';

export function SettingsModal({ open, onClose }) {
  const dialogRef = useRef(null);
  const [apiKey, setApiKeyState] = useState('');
  const [shopName, setShopNameState] = useState('');
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      setApiKeyState(getApiKey());
      setShopNameState(getShopName());
      setShowKey(false);
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleCancel = (e) => { e.preventDefault(); onClose(); };
    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  function handleSave() {
    setApiKey(apiKey.trim());
    setShopName(shopName.trim());
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-0 h-full w-full max-w-none bg-transparent p-0 backdrop:bg-black/40 sm:m-auto sm:h-auto sm:max-w-md sm:rounded-2xl"
    >
      <div className="min-h-full bg-white p-5 sm:min-h-0 sm:rounded-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Einstellungen</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700">
              <Key size={14} />
              Claude API-Schlüssel
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white pl-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKeyState(e.target.value)}
                placeholder="sk-ant-api03-…"
                className="flex-1 bg-transparent py-2.5 font-mono text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                autoComplete="off"
                spellCheck={false}
              />
              <button
                type="button"
                onClick={() => setShowKey((v) => !v)}
                className="px-3 py-2.5 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showKey ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            <p className="mt-1.5 text-xs text-gray-500">
              Wird nur lokal im Browser gespeichert — niemals an Dritte weitergegeben.{' '}
              <a
                href="https://console.anthropic.com/settings/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-brand-600 hover:underline"
              >
                API-Schlüssel erstellen
                <ExternalLink size={10} />
              </a>
            </p>
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700">
              <Store size={14} />
              Shop-Name (für Shopify-Export)
            </label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopNameState(e.target.value)}
              placeholder="z.B. Vintage Vogue Shop"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              autoComplete="off"
            />
            <p className="mt-1 text-xs text-gray-500">
              Wird als Vendor-Feld im Shopify-CSV verwendet.
            </p>
          </div>

          <div className="rounded-xl bg-violet-50 p-3 text-xs leading-relaxed text-violet-700">
            <strong>So funktioniert die KI-Analyse:</strong> Du fotografierst das Cover, Claude
            Opus erkennt Titel, Ausgabe und Datum, schlägt einen Verkaufspreis vor und schreibt
            automatisch Beschreibung, Tags und SEO-Texte für deinen Shopify-Shop. Preisvorschläge
            bitte immer prüfen — sie basieren auf dem Modell-Trainingswissen.
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSave}
            className="flex-1 rounded-xl bg-brand-500 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
          >
            Speichern
          </button>
        </div>
      </div>
    </dialog>
  );
}
