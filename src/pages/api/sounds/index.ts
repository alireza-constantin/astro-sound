import { db, sounds } from "@/db/schema";
import type { APIRoute } from "astro";

// create a new sound
export const POST: APIRoute = async ({ request }) => {
	const raw = await request.json();
    console.log(raw);
	// todo: add try catch for validation and handling errors
	try {
		console.log(raw);
		const soundList = await db
			.insert(sounds)
			.values(raw)
			.returning();
		// const soundList = await db.select().from(sounds).where(eq(sounds.boardId, boardId));
		return new Response(JSON.stringify(soundList[0]));
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ msg: "handle error" }), { status: 400 });
	}
		// return new Response(JSON.stringify({ msg: "test" }));

};
