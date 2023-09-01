import type { APIRoute } from "astro";
import { z } from "zod";

const payload = z.array(
	z.object({
		url: z.string().url(),
		id: z.string(),
	}),
);

export const POST: APIRoute = async ({ request }) => {
	const raw = await request.json();
    // todo: add try catch for validation and handling errors
	const data = payload.parse(raw);
	console.log(data);

	return new Response(JSON.stringify({ msg: "ok" }));
};
