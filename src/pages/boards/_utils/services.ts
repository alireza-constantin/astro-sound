import { type MutatorCallback } from "swr";

import { createSound, deleteBoard, renameBoard } from "@/utils/apis";
import type { CreateSoundProps } from "@/utils/type";
import type { Sound } from "@/db/schema";

export function createBoardModalService(boardId: string, boardName: string | undefined) {
	return {
		delete: async () => {
			if (!boardId) {
				return;
			}
			try {
				await deleteBoard(boardId);
				window.location.pathname = "/boards";
			} catch (error) {
				console.log(error);
			}
		},
		rename: async () => {
			console.log("hello");
			console.log(boardName);
			if (!boardName) {
				return;
			}
			try {
				await renameBoard(boardId, boardName);
				window.location.reload();
			} catch (error) {
				console.log(error);
			}
		},
	};
}

