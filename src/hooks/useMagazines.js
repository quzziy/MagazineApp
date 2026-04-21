import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';

export function useMagazines() {
  return useLiveQuery(() => db.magazines.orderBy('createdAt').reverse().toArray(), []);
}
