import { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, X, AlertCircle, Loader2 } from 'lucide-react';
import { analyzeMagazineCover, getApiKey } from '../../services/claudeService';

export function CoverScanner({ onResult }) {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const fileRef = useRef(null);
  const cameraRef = useRef(null);

  function handleFile(file) {
    if (!file) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError(null);
    setSuccess(false);
  }

  function clearImage() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setImageFile(null);
    setPreviewUrl(null);
    setError(null);
    setSuccess(false);
    if (fileRef.current) fileRef.current.value = '';
    if (cameraRef.current) cameraRef.current.value = '';
  }

  async function handleAnalyze() {
    if (!imageFile) return;
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const result = await analyzeMagazineCover(imageFile);
      onResult(result);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const hasKey = Boolean(getApiKey());

  return (
    <div className="space-y-2">
      {!imageFile ? (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-4 text-sm font-medium text-gray-500 transition-colors hover:border-brand-300 hover:bg-brand-50/40 hover:text-brand-600"
          >
            <Upload size={15} />
            Cover-Bild wählen
          </button>
          <button
            type="button"
            onClick={() => cameraRef.current?.click()}
            title="Kamera öffnen"
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 px-4 py-4 text-sm font-medium text-gray-500 transition-colors hover:border-brand-300 hover:bg-brand-50/40 hover:text-brand-600"
          >
            <Camera size={15} />
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
            <img
              src={previewUrl}
              alt="Cover-Vorschau"
              className="h-52 w-full object-contain"
            />
            <button
              type="button"
              onClick={clearImage}
              className="absolute right-2 top-2 rounded-full bg-white/90 p-1 text-gray-500 shadow hover:text-red-500"
            >
              <X size={14} />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={loading || !hasKey}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-55"
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Analysiere Cover…
              </>
            ) : success ? (
              <>
                <Sparkles size={15} />
                Erneut analysieren
              </>
            ) : (
              <>
                <Sparkles size={15} />
                Mit KI analysieren
              </>
            )}
          </button>

          {!hasKey && (
            <p className="text-center text-xs text-amber-600">
              Bitte zuerst einen Claude API-Schlüssel in den Einstellungen (⚙) hinterlegen.
            </p>
          )}

          {success && (
            <p className="text-center text-xs font-medium text-green-600">
              Felder wurden ausgefüllt – bitte prüfen und ggf. anpassen.
            </p>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700">
          <AlertCircle size={14} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
