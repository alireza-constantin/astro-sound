import { createClient } from "@vercel/postgres";
import { loadEnv } from "vite";
const env = loadEnv(process.env.NODE_ENV!, process.cwd(), "");
console.log(env);
console.log(process.env);

async function queryPosts() {
	const client = createClient({
		connectionString: env.POSTGRES_URL_NON_POOLING,
	});
	await client.connect();

	try {
		const likes = 100;
		const res = await client.sql`SELECT * FROM posts;`;
		console.log(res);
	} finally {
		await client.end();
	}
}
// queryPosts();
