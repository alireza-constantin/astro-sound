import { boards, db, sounds } from "@/db/schema";
import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const DELETE: APIRoute = async ({ params }) => {
	const { boardId } = params;
	// // todo: add try catch for validation and handling errors
	if (!boardId) {
		return new Response(JSON.stringify({ msg: "please provide a board id" }), { status: 400 });
	}
	try {
		await db.delete(boards).where(eq(boards.id, boardId));
		return new Response(JSON.stringify({ msg: "ok" }));
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ msg: "handle error" }), { status: 400 });
	}
};

export const PUT: APIRoute = async({ params, request }) => {
	const { boardId } = params;
	const { name } = await request.json()
	// // todo: add try catch for validation and handling errors
	if (!boardId) {
		return new Response(JSON.stringify({ msg: "please provide a board id" }), { status: 400 });
	}

	try {
		await db.update(boards).set({ name }).where(eq(boards.id, boardId))
		return new Response(JSON.stringify({ msg: "ok" }));
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ msg: "handle error" }), { status: 400 });
	}
}

// get all the sounds of boards
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
