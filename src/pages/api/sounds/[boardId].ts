import { sounds, db } from "@/db/schema";
import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";
// import { z } from "zod";

// const payload = z.object({
// 	name: z.string(),
// });
export const GET: APIRoute = async ({ params }) => {
	const { boardId } = params;
	if (!boardId) {
		return new Response(JSON.stringify({ msg: "please provide a board id" }), { status: 400 });
	}

	try {
		const soundList = await db.select().from(sounds).where(eq(sounds.boardId, boardId));
		return new Response(JSON.stringify(soundList));
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ msg: "handle error" }), { status: 400 });
	}
};


export const POST: APIRoute = async ({ request, params }) => {
	const { boardId } = params;
	if (!boardId) {
		return new Response(JSON.stringify({ msg: "please provide a board id" }), { status: 400 });
	}
	const raw = await request.json();
	delete raw.createdAt;
	// // todo: add try catch for validation and handling errors
	// try {
	// 	console.log(raw);
	// 	const soundList = await db.insert(sounds).values({...raw, boardId}).returning();
	// 	// const soundList = await db.select().from(sounds).where(eq(sounds.boardId, boardId));
	// 	return new Response(JSON.stringify(soundList[0]));
	// } catch (error) {
		// console.log(error);
		return new Response(JSON.stringify({ msg: "handle error" }), { status: 400 });
	// }
};
