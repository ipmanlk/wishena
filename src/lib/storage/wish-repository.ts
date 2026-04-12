import type { Wish } from "../types";
import { safeGetItem, safeSetItem } from "./local-storage";

const STORAGE_KEY = "wishena:wishes";

function readRaw(): Record<string, Wish> {
  const data = safeGetItem(STORAGE_KEY);
  try {
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function writeRaw(obj: Record<string, Wish>) {
  safeSetItem(STORAGE_KEY, JSON.stringify(obj));
}

export const wishRepository = {
  getAll(): Record<string, Wish> {
    return readRaw();
  },

  getById(id: string): Wish | null {
    const wishes = readRaw();
    return wishes[id] || null;
  },

  save(wish: Wish): void {
    const wishes = readRaw();
    wishes[wish.id] = wish;
    writeRaw(wishes);
  },

  delete(id: string): void {
    const wishes = readRaw();
    delete wishes[id];
    writeRaw(wishes);
  },
};
