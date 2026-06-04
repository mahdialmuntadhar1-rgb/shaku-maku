/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_ADMIN_EMAIL?: string;
  readonly VITE_ADMIN_EMAILS?: string;
  readonly VITE_ALLOW_LOCAL_AUTH_FALLBACK?: 'true' | 'false';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
