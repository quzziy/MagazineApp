import Dexie from 'dexie';

export const db = new Dexie('MagazineInventoryDB');

db.version(1).stores({
  magazines: '++id, titel, ausgabe, erscheinungsdatum, einkaufspreis, verkaufspreis, menge, createdAt, updatedAt',
});

// Version 2 adds zustand index for future filtering; other new fields
// (beschreibung, tags, seo_titel, seo_beschreibung) are stored but not indexed
db.version(2).stores({
  magazines: '++id, titel, ausgabe, erscheinungsdatum, einkaufspreis, verkaufspreis, menge, zustand, createdAt, updatedAt',
});

export async function addMagazine(data) {
  const now = Date.now();
  return db.magazines.add({ ...data, createdAt: now, updatedAt: now });
}

export async function updateMagazine(id, data) {
  return db.magazines.update(id, { ...data, updatedAt: Date.now() });
}

export async function deleteMagazine(id) {
  return db.magazines.delete(id);
}
