import { beforeEach } from 'vitest';

class MemoryStorage implements Storage {
  private store = new Map<string, string>();

  get length(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }
}

function ensureTestStorage(): void {
  const g = globalThis as typeof globalThis & {
    localStorage?: Storage;
    sessionStorage?: Storage;
  };

  if (!g.localStorage) {
    Object.defineProperty(g, 'localStorage', {
      value: new MemoryStorage(),
      configurable: true,
      writable: true,
    });
  }

  if (!g.sessionStorage) {
    Object.defineProperty(g, 'sessionStorage', {
      value: new MemoryStorage(),
      configurable: true,
      writable: true,
    });
  }
}

ensureTestStorage();

beforeEach(() => {
  ensureTestStorage();
  globalThis.localStorage.clear();
  globalThis.sessionStorage.clear();
});
