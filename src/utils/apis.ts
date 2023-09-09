import type { Board, Sound } from "@/db/schema";
import type { CreateSoundProps } from "./type";

export async function createBoard(formData: FormData): Promise<{ boardId: string }> {
	return fetch("/api/boards", {
		body: formData,
		method: "POST",
	}).then((res) => res.json());
}

export function deleteBoard(boardId: string) {
	return fetch(`/api/boards/${boardId}`, {
		method: "DELETE",
	});
}

export async function renameBoard(boardId: string, name: string) {
	return fetch(`/api/boards/${boardId}`, {
		method: "PUT",
		body: JSON.stringify({ name }),
		headers: {
			"content-type": "application/json",
		},
	})
		.then((res) => {
			if (!res.ok) {
				throw new Error(JSON.stringify(res.json()));
			}
			res;
		})
		.catch((e) => {
			throw new Error(e);
		});
}

export async function createSound(boardId: string, body: CreateSoundProps): Promise<Sound> {
	return fetch(`/api/sounds`, {
		method: "POST",
		body: JSON.stringify({ ...body, boardId }),
		headers: {
			"content-type": "application/json",
		},
	}).then((res) => res.json());
}

export async function updateSoundName(soundId: string, soundName: string) {
	const res = await fetch(`/api/sounds/${soundId}`, {
		method: "PUT",
		body: JSON.stringify({ name: soundName }),
		headers: {
			"content-type": "application/json",
		},
	});
	const data = await res.json();

	if (!res.ok) {
		throw new Error(data);
	}
	return data;
}

export async function deleteSound(soundId: string) {
	return fetch(`/api/sounds/${soundId}`, {
		method: "DELETE",
	}).then((res) => res.json());
}
