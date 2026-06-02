const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

export function getApiKey() {
  return localStorage.getItem('claude_api_key') ?? '';
}

export function setApiKey(key) {
  if (key) {
    localStorage.setItem('claude_api_key', key);
  } else {
    localStorage.removeItem('claude_api_key');
  }
}

export function getShopName() {
  return localStorage.getItem('shop_name') ?? '';
}

export function setShopName(name) {
  if (name) {
    localStorage.setItem('shop_name', name);
  } else {
    localStorage.removeItem('shop_name');
  }
}

async function resizeToBase64(file, maxWidth = 1024, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(dataUrl.split(',')[1]);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Bild konnte nicht geladen werden.'));
    };
    img.src = url;
  });
}

const PROMPT = `Analysiere dieses Vintage-Modemagazin-Cover und gib die folgenden Informationen als reines JSON zurück (ohne Markdown-Blöcke):

{
  "titel": "Name der Zeitschrift (z.B. Vogue, Elle, Harper's Bazaar, Cosmopolitan)",
  "ausgabe": "Ausgabe/Nummer (z.B. März 1995 oder 3/1995)",
  "erscheinungsdatum": "Datum als YYYY-MM-DD – schätze wenn nötig",
  "beschreibung": "2–3 Sätze Produktbeschreibung auf Deutsch für einen Vintage-Shop. Beschreibe das Cover, herausragende Inhalte/Models, und warum es ein schönes Sammlerstück ist.",
  "zustand": "Sehr gut",
  "tags": ["Magazintitel", "Jahrzehnt z.B. 1990er", "ggf. Cover-Model", "Mode", "ggf. Land"],
  "seo_titel": "SEO-Seitentitel, max. 60 Zeichen",
  "seo_beschreibung": "SEO-Meta-Beschreibung, max. 155 Zeichen",
  "verkaufspreis": 12.00
}

Preis-Richtwerte: normale Ausgaben 4–8 €, besondere Cover/bekannte Models 8–25 €, historisch bedeutsame oder sehr rare Ausgaben 25–80 €.
Antworte NUR mit dem JSON – kein Text davor oder danach.`;

export async function analyzeMagazineCover(imageFile) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error(
      'Kein Claude API-Schlüssel hinterlegt. Bitte zuerst in den Einstellungen (⚙) eingeben.'
    );
  }

  const base64Image = await resizeToBase64(imageFile);

  const response = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-ipc': 'true',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-8',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: 'image/jpeg', data: base64Image },
            },
            { type: 'text', text: PROMPT },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const msg = err?.error?.message ?? `HTTP ${response.status}`;
    if (response.status === 401) throw new Error('Ungültiger API-Schlüssel. Bitte in den Einstellungen prüfen.');
    if (response.status === 429) throw new Error('Rate-Limit erreicht. Bitte kurz warten und erneut versuchen.');
    throw new Error(`API-Fehler: ${msg}`);
  }

  const data = await response.json();
  const text = data.content?.[0]?.text?.trim() ?? '';

  let result;
  try {
    // Strip possible markdown code fences just in case
    const clean = text.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim();
    result = JSON.parse(clean);
  } catch {
    throw new Error('Antwort konnte nicht verarbeitet werden. Bitte erneut versuchen.');
  }

  if (Array.isArray(result.tags)) {
    result.tags = result.tags.join(', ');
  }
  if (typeof result.verkaufspreis === 'string') {
    result.verkaufspreis = parseFloat(result.verkaufspreis.replace(',', '.')) || '';
  }

  return result;
}
