import type { Sound } from "@/db/schema";
import { z } from "zod";

export type EventProps = {
	eventName: string;
};

export type ActionTypes = "delete" | "rename";

export type OpenDialogEventDetail = {
	title: string;
	description: string;
	type: ActionTypes;
    boardId: string;
    boardName?: string;
};

export const CreateSoundSchema = z.object({
	name: z.string().min(1),
	url: z.string().url(),
})
export type CreateSoundProps = z.infer<typeof CreateSoundSchema>;

export type ClientSound = {
	[K in keyof Sound]: K extends 'createdAt' ? string : Sound[K] 
}

export const notEmpty = z.string().trim().min(1, { message: "Required" });