import { boards, db } from "@/db/schema";
import type { APIRoute } from "astro";
import { z } from "zod";

const payload = z.object({
	name: z.string(),
});

export const POST: APIRoute = async ({ request }) => {
	const raw = await request.formData();
	// // todo: add try catch for validation and handling errors
	const data = Object.fromEntries(raw.entries());
	try {
		const { name } = payload.parse(data);
		const [board] = await db.insert(boards).values({ name }).returning()
		return new Response(JSON.stringify({ boardId: board.id }));

	} catch (error) {
		console.log(error)
		return new Response(JSON.stringify({ msg: "handle error" }), { status: 400 });
	}
};
