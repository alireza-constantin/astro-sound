import type { ZodError } from "zod";

export function formatZodErrors(e: ZodError) {
    return e.errors.map(e => {
        let field = e.path[0]
        let message = e.message;
        if(message === "Required"){
            message = `the ${field} field can not be empty`;
        }
        return {
            field,
            message,
            code: "validation_error"
        }
    });
}
