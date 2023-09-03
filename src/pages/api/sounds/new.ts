import { sounds, db } from "@/db/schema";
import type { APIRoute } from "astro";
// import { z } from "zod";

// const payload = z.object({
// 	name: z.string(),
// });

export const POST: APIRoute = async ({ request }) => {
	const raw = await request.json();
	// // todo: add try catch for validation and handling errors
	try {
		// const { name } = payload.parse(data);
		await db.insert(sounds).values(raw);
		return new Response(JSON.stringify({ msg: 'ok' }));
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ msg: "handle error" }), { status: 400 });
	}
};
