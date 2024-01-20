/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DB_USERNAME: string
  readonly VITE_DB_PASSWORD: string
  readonly VITE_DB_HOSTNAME: string
  readonly VITE_DB_PORT: string
  readonly VITE_DB_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
