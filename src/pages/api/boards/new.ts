import type { APIRoute } from "astro";
import { z } from "zod"


const payload = z.object({
    url: z.string().url()
})

export const POST: APIRoute = async({request}) => {
    const body = await request.formData()
    const data = payload.parse(Object.fromEntries(body))
    console.log(data.url)

    return new Response(JSON.stringify({msg: 'ok'}))
}
