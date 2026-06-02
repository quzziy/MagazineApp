import { useState } from 'react';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { checkPassword, setUnlocked } from '../../services/authService';

export function PasswordGate({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setError(false);
    const ok = await checkPassword(password);
    setLoading(false);
    if (ok) {
      setUnlocked();
      onUnlock();
    } else {
      setError(true);
      setPassword('');
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
            <Lock size={22} className="text-brand-500" />
          </div>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-900">Magazin-Inventar</h1>
            <p className="mt-0.5 text-sm text-gray-500">Bitte Passwort eingeben</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white pl-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100">
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="Passwort"
              autoFocus
              className="flex-1 bg-transparent py-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="px-3 py-3 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600">
              <AlertCircle size={14} className="shrink-0" />
              Falsches Passwort
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full rounded-xl bg-brand-500 py-3 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-50"
          >
            {loading ? 'Prüfe…' : 'Entsperren'}
          </button>
        </form>
      </div>
    </div>
  );
}
