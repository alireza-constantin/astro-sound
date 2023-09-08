import { boards, db } from "@/db/schema";
import { formatZodErrors } from "@/pages/boards/_utils/serverHelper";
import type { APIRoute } from "astro";
import { z, ZodError } from "zod";
import { DrizzleError } from "drizzle-orm";

const payload = z.object({
	name: z.string(),
});

export const POST: APIRoute = async ({ request }) => {
	const raw = await request.formData();
	// todo: add try catch for validation and handling errors
	try {
		const data = payload.parse(Object.fromEntries(raw.entries()));
		const { name } = payload.parse(data);
		const [board] = await db.insert(boards).values({ name }).returning();
		return new Response(JSON.stringify({ boardId: board.id }));
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
