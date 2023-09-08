import { db, sounds } from "@/db/schema";
import { formatZodErrors } from "@/pages/boards/_utils/serverHelper";
import type { APIRoute } from "astro";
import { DrizzleError } from "drizzle-orm";
import { ZodError, z } from "zod";

const payload = z.object({
	name: z.string(),
	url: z.string().url(),
	boardId: z.string(),
});

// create a new sound
// @route   api/sounds
// @method	POST
// @body	{ name, url, boardId }
export const POST: APIRoute = async ({ request }) => {
	const raw = await request.json();
	// todo: add try catch for validation and handling errors
	try {
		const data = payload.parse(raw);
		const soundList = await db.insert(sounds).values(data).returning();
		return new Response(JSON.stringify(soundList[0]));
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
