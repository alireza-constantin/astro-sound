import { sounds, db } from "@/db/schema";
import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";
// import { z } from "zod";

// const payload = z.object({
// 	name: z.string(),
// });


export const DELETE: APIRoute = async ({ params }) => {
	console.log('hello')
	const { boardId } = params;
	if (!boardId) {
		return new Response(JSON.stringify({ msg: "please provide a board id" }), { status: 400 });
	}
	// todo: add try catch for validation and handling errors
	try {
		await db.delete(sounds).where(eq(sounds.id, boardId));
		return new Response(JSON.stringify({ msg: "ok" }));
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ msg: "handle error" }), { status: 400 });
	}
};

export const PUT: APIRoute = async ({ params, request }) => {
	console.log("hello");
	const { boardId } = params;
	
	if (!boardId) {
		return new Response(JSON.stringify({ msg: "please provide a board id" }), { status: 400 });
	}
	const raw = await request.json();
	// todo: add try catch for validation and handling errors
	try {
		const sound = await db.update(sounds).set({ name: raw.name}).where(eq(sounds.id, boardId)).returning({ userName: sounds.name })
		// const soundList = await db.select().from(sounds).where(eq(sounds.boardId, boardId));
		return new Response(JSON.stringify({ name:  sound[0].userName}));
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ msg: "handle error" }), { status: 400 });
	}
};
