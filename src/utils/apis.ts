import type { Board, Sound } from "@/db/schema";
import type { CreateSoundProps } from "./type";

export async function createBoard(formData: FormData): Promise<{ boardId: string }> {
	const res = await fetch("/api/boards", {
		body: formData,
		method: "POST",
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data);
	}
	return data;
}

export async function deleteBoard(boardId: string) {
	const res = await fetch(`/api/boards/${boardId}`, {
		method: "DELETE",
	});
	const data = await res.json();

	if (!res.ok) {
		throw new Error(data);
	}
	return data;
}

export async function renameBoard(boardId: string, name: string) {
	const res = await fetch(`/api/boards/${boardId}`, {
		method: "PUT",
		body: JSON.stringify({ name }),
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

export async function createSound(boardId: string, body: CreateSoundProps): Promise<Sound> {
	const res = await fetch(`/api/sounds`, {
		method: "POST",
		body: JSON.stringify({ ...body, boardId }),
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
	const res = await fetch(`/api/sounds/${soundId}`, {
		method: "DELETE",
	});
	const data = await res.json();

	if (!res.ok) {
		throw new Error(data);
	}
	return data;
}
