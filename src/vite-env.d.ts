interface ImportMetaEnv {
  readonly VITE_CONTENT_API_URL?: string;
  readonly VITE_ADMIN_ACCESS_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
