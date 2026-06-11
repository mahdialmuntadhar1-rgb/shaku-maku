import '@testing-library/jest-dom';
import { beforeEach, vi } from 'vitest';

type StorageMock = Storage & {
  _store: Record<string, string>;
};

function createStorageMock(): StorageMock {
  const storage = {
    _store: {} as Record<string, string>,

    get length() {
      return Object.keys(this._store).length;
    },

    clear: vi.fn(function clear(this: StorageMock) {
      this._store = {};
    }),

    getItem: vi.fn(function getItem(this: StorageMock, key: string) {
      return Object.prototype.hasOwnProperty.call(this._store, key) ? this._store[key] : null;
    }),

    key: vi.fn(function key(this: StorageMock, index: number) {
      return Object.keys(this._store)[index] ?? null;
    }),

    removeItem: vi.fn(function removeItem(this: StorageMock, key: string) {
      delete this._store[key];
    }),

    setItem: vi.fn(function setItem(this: StorageMock, key: string, value: string) {
      this._store[key] = String(value);
    }),
  } as StorageMock;

  return storage;
}

function ensureStorage(name: 'localStorage' | 'sessionStorage'): StorageMock {
  const existing = globalThis[name] as StorageMock | undefined;

  if (existing && typeof existing.clear === 'function') {
    return existing;
  }

  const mock = createStorageMock();

  Object.defineProperty(globalThis, name, {
    value: mock,
    configurable: true,
    writable: true,
  });

  Object.defineProperty(window, name, {
    value: mock,
    configurable: true,
    writable: true,
  });

  return mock;
}

beforeEach(() => {
  const local = ensureStorage('localStorage');
  const session = ensureStorage('sessionStorage');

  local.clear();
  session.clear();

  vi.clearAllMocks();
});