import type { Config } from 'drizzle-kit'
import { loadEnv } from "vite";
const env = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

export default {
	schema: "./src/db/schema.ts",
	out: "./drizzle",
	driver: "pg",
	dbCredentials: {
		connectionString: env.POSTGRES_URL ,
	},
} satisfies Config;