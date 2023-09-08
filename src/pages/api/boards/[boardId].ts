import { boards, db, sounds } from "@/db/schema";
import { formatZodErrors } from "@/pages/boards/_utils/serverHelper";
import type { APIRoute } from "astro";
import { DrizzleError, eq } from "drizzle-orm";
import { ZodError, z } from "zod";


// delete a board
// @route   api/boards/:boardId
// @method	DELETE
// @body	{ }
export const DELETE: APIRoute = async ({ params }) => {
	const { boardId } = params;
	// // todo: add try catch for validation and handling errors
	if (!boardId) {
		return new Response(JSON.stringify({ msg: "please provide a board id" }), { status: 403 });
	}
	try {
		await db.delete(boards).where(eq(boards.id, boardId));
		return new Response(JSON.stringify({ msg: "ok" }));
	} catch (e) {
		if (e instanceof ZodError) {
			const error = formatZodErrors(e);
			return new Response(JSON.stringify({ msg: "validation error", error }), {
				status: 403,
			});
		}

		if (e instanceof DrizzleError) {
			return new Response(JSON.stringify({ msg: "Database error", error: e }), {
				status: 403,
			});
		}

		console.log(e);
		return new Response(JSON.stringify({ msg: "something went wrong", error: e }), {
			status: 500,
		});
	}
};

const putPayload = z.object({
	name: z.string()
})

// update a board name
// @route   api/boards/:boardId
// @method	PUT
// @body	{ name }
export const PUT: APIRoute = async ({ params, request }) => {
	const { boardId } = params;
	if (!boardId) {
		return new Response(JSON.stringify({ msg: "please provide a board id" }), { status: 403 });
	}

	try {
		const { name } = putPayload.parse(await request.json())
		await db.update(boards).set({ name }).where(eq(boards.id, boardId));
		return new Response(JSON.stringify({ msg: "ok" }));
	} catch (e) {
		if (e instanceof ZodError) {
			const error = formatZodErrors(e);
			return new Response(JSON.stringify({ msg: "validation error", error }), {
				status: 403,
			});
		}

		if (e instanceof DrizzleError) {
			return new Response(JSON.stringify({ msg: "Database error", error: e }), {
				status: 403,
			});
		}

		console.log(e);
		return new Response(JSON.stringify({ msg: "something went wrong", error: e }), {
			status: 500,
		});
	}
};

// get all the sounds related to a board
// @route   api/boards/:boardId
// @method	GET
// @body	{ }
export const GET: APIRoute = async ({ params }) => {
	const { boardId } = params;
	if (!boardId) {
		return new Response(JSON.stringify({ msg: "please provide a board id" }), { status: 403 });
	}

	try {
		const soundList = await db.select().from(sounds).where(eq(sounds.boardId, boardId));
		return new Response(JSON.stringify(soundList));
	} catch (e) {
		if (e instanceof ZodError) {
			const error = formatZodErrors(e);
			return new Response(JSON.stringify({ msg: "validation error", error }), {
				status: 403,
			});
		}

		if (e instanceof DrizzleError) {
			return new Response(JSON.stringify({ msg: "Database error", error: e }), {
				status: 403,
			});
		}

		console.log(e);
		return new Response(JSON.stringify({ msg: "something went wrong", error: e }), {
			status: 500,
		});
	}
};
