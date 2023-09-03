import { BoardItems, db } from "@/db/schema";
import type { APIRoute } from "astro";
// import { z } from "zod";

// const payload = z.object({
// 	name: z.string(),
// });

export const POST: APIRoute = async ({ request }) => {
	const raw = await request.json();
	// // todo: add try catch for validation and handling errors
	// const data = Object.fromEntries(raw.entries());
    console.log(raw);
    // const test = []
	try {
		// const { name } = payload.parse(data);
		const sounds = await db.insert(BoardItems).values(raw).returning();
        console.log(sounds);
		return new Response(JSON.stringify({ msg: 'ok' }));
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ msg: "handle error" }), { status: 400 });
	}
};
