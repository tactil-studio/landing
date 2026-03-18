/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
	readonly RESEND_API_KEY: string;
	readonly NOTION_INTEGRATION_SECRET: string;
	readonly NOTION_DATABASE_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

