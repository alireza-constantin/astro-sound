import { boards, db } from "@/db/schema";
import { formatZodErrors } from "@/pages/boards/_utils/serverHelper";
import type { APIRoute } from "astro";
import { z, ZodError } from "zod";

const payload = z.object({
	name: z.string(),
	url: z.string().url({ message: 'invalid url format' }),
	issue: z.string().startsWith("te"),
	text: z.string().min(2, { message: 'text can not be less than 2 character' })
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
		if(e instanceof ZodError){
			const error = formatZodErrors(e);
			return new Response(JSON.stringify({ msg: "validation error", error }), { status: 403 });
		}
		return new Response(JSON.stringify({ msg: "handle error" }), { status: 400 });
	}
};
