import { sounds, db } from "@/db/schema";
import { formatZodErrors } from "@/pages/boards/_utils/serverHelper";
import type { APIRoute } from "astro";
import { DrizzleError, eq } from "drizzle-orm";
import { ZodError, z } from "zod";

// delete a sound
// @route   api/sounds/:soundId
// @method	DELETE
// @body	{ }
export const DELETE: APIRoute = async ({ params }) => {
	const { soundId } = params;
	if (!soundId) {
		return new Response(JSON.stringify({ msg: "please provide a board id" }), { status: 400 });
	}
	try {
		await db.delete(sounds).where(eq(sounds.id, soundId));
		return new Response(JSON.stringify({ msg: "ok" }));
	} catch (e) {
		if (e instanceof ZodError) {
			const error = formatZodErrors(e);
			return new Response(JSON.stringify({ msg: "validation error", error }), {
				status: 403,
			});
		}

		if (e instanceof DrizzleError) {
			return new Response(JSON.stringify({ msg: "DataBase error", error: e }), {
				status: 403,
			});
		}

		console.log(e);
		return new Response(JSON.stringify({ msg: "something went wrong", error: e }), {
			status: 500,
		});
	}

	
};

const notEmpty = z.string().trim().min(1, {  message: 'Required' })
const updatePayload = z.object({
	name: z.string().pipe(notEmpty),
});
// update the sound name
// @route   api/sounds/:soundId
// @method	POST
// @body	{ name }
export const PUT: APIRoute = async ({ params, request }) => {
	const { soundId } = params;

	if (!soundId) {
		return new Response(JSON.stringify({ msg: "please provide a board id" }), { status: 400 });
	}
	try {
		const { name } = updatePayload.parse(await request.json());
		const sound = await db
			.update(sounds)
			.set({ name })
			.where(eq(sounds.id, soundId))
			.returning({ userName: sounds.name });
		return new Response(JSON.stringify({ name: sound[0].userName }));
	} catch (e) {
		if (e instanceof ZodError) {
			const error = formatZodErrors(e);
			return new Response(JSON.stringify({ msg: "validation error", error }), {
				status: 403,
			});
		}

		if (e instanceof DrizzleError) {
			return new Response(JSON.stringify({ msg: "DataBase error", error: e }), {
				status: 403,
			});
		}

		console.log(e);
		return new Response(JSON.stringify({ msg: "something went wrong", error: e }), {
			status: 500,
		});
	}
};
