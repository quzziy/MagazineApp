async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function hasPassword() {
  return Boolean(localStorage.getItem('app_pw_hash'));
}

export async function setPassword(password) {
  if (!password) {
    localStorage.removeItem('app_pw_hash');
  } else {
    localStorage.setItem('app_pw_hash', await sha256(password));
  }
}

export async function checkPassword(password) {
  const stored = localStorage.getItem('app_pw_hash');
  if (!stored) return true;
  return (await sha256(password)) === stored;
}

export function isUnlocked() {
  return sessionStorage.getItem('app_unlocked') === '1';
}

export function setUnlocked() {
  sessionStorage.setItem('app_unlocked', '1');
}

export function lock() {
  sessionStorage.removeItem('app_unlocked');
}
