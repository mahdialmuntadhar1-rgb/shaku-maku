// Firebase has been removed from this project.
// This stub exists only to satisfy any remaining import references during migration.
// All real data is now served via the Cloudflare Workers REST API (src/api.ts).

export const db = null as any;
export const auth = null as any;
export const signInWithGoogle = async () => null;
export const handleFirestoreError = (_err: any, _op?: any, _path?: string) => {};
export enum OperationType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  READ = 'READ',
}
