import { useEffect, useRef, useState } from 'react';
import { X, Key, Store, Lock, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { getApiKey, setApiKey, getShopName, setShopName } from '../../services/claudeService';
import { hasPassword, setPassword, lock } from '../../services/authService';

export function SettingsModal({ open, onClose, onLock }) {
  const dialogRef = useRef(null);
  const [apiKey, setApiKeyState] = useState('');
  const [shopName, setShopNameState] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      setApiKeyState(getApiKey());
      setShopNameState(getShopName());
      setNewPassword('');
      setConfirmPassword('');
      setPwError('');
      setPwSuccess(false);
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

  async function handleSave() {
    // Validate password fields if touched
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        setPwError('Passwörter stimmen nicht überein.');
        return;
      }
      if (newPassword.length < 4) {
        setPwError('Mindestens 4 Zeichen.');
        return;
      }
      await setPassword(newPassword);
      setPwSuccess(true);
    }
    setApiKey(apiKey.trim());
    setShopName(shopName.trim());
    onClose();
  }

  async function handleRemovePassword() {
    await setPassword('');
    setPwSuccess(false);
    setPwError('');
    setNewPassword('');
    setConfirmPassword('');
  }

  function handleLockNow() {
    lock();
    onClose();
    onLock?.();
  }

  const inp = 'w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100';
  const lbl = 'mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700';

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-0 h-full w-full max-w-none overflow-y-auto bg-transparent p-0 backdrop:bg-black/40 sm:m-auto sm:h-auto sm:max-h-[90vh] sm:max-w-md sm:rounded-2xl"
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

        <div className="space-y-5">
          {/* API Key */}
          <div>
            <label className={lbl}>
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
              Nur lokal gespeichert — nie weitergegeben.{' '}
              <a
                href="https://console.anthropic.com/settings/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-brand-600 hover:underline"
              >
                Schlüssel erstellen
                <ExternalLink size={10} />
              </a>
            </p>
          </div>

          {/* Shop Name */}
          <div>
            <label className={lbl}>
              <Store size={14} />
              Shop-Name (für Shopify-Export)
            </label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopNameState(e.target.value)}
              placeholder="z.B. Vintage Vogue Shop"
              className={inp}
              autoComplete="off"
            />
          </div>

          {/* Password */}
          <div>
            <label className={lbl}>
              <Lock size={14} />
              {hasPassword() ? 'Passwort ändern' : 'Passwort setzen'}
            </label>
            <div className="space-y-2">
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 pl-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => { setNewPassword(e.target.value); setPwError(''); setPwSuccess(false); }}
                  placeholder="Neues Passwort"
                  className="flex-1 bg-transparent py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="px-3 py-2.5 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <input
                type={showPw ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setPwError(''); }}
                placeholder="Passwort wiederholen"
                className={inp}
                autoComplete="new-password"
              />
            </div>

            {pwError && (
              <p className="mt-1.5 text-xs text-red-600">{pwError}</p>
            )}
            {pwSuccess && (
              <p className="mt-1.5 text-xs text-green-600">Passwort gespeichert.</p>
            )}

            {hasPassword() && (
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={handleRemovePassword}
                  className="text-xs text-gray-400 hover:text-red-500"
                >
                  Passwort entfernen
                </button>
                <span className="text-xs text-gray-200">|</span>
                <button
                  type="button"
                  onClick={handleLockNow}
                  className="text-xs text-gray-400 hover:text-brand-600"
                >
                  Jetzt sperren
                </button>
              </div>
            )}
          </div>

          <div className="rounded-xl bg-violet-50 p-3 text-xs leading-relaxed text-violet-700">
            <strong>KI-Analyse:</strong> Claude Opus erkennt das Cover und füllt Titel, Preis,
            Beschreibung, Tags und SEO-Felder automatisch aus. Preise immer prüfen.
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
