import type { CreateSoundProps } from "./type";

export function deleteBoard(boardId: string){
    return fetch(`/api/boards/${boardId}`, {
		method: "DELETE",
	});
}

export function renameBoard(boardId: string, name: string){
    return  fetch(`/api/boards/${boardId}`, {
		method: "PUT",
		body: JSON.stringify({ name }),
		headers: {
			"content-type": "application/json",
		},
	});
}

export async function createSound(boardId: string, body: CreateSoundProps){
	return fetch(`/api/sounds/${boardId}`, {
		method: "POST",
		body: JSON.stringify(body),
		headers: {
			"content-type": "application/json",
		},
	}).then((res) => res.json());
}

export async function updateSoundName(soundId: string, soundName: string) {
	return fetch(`/api/sounds/${soundId}`, {
		method: "PUT",
		body: JSON.stringify(soundName),
		headers: {
			"content-type": "application/json",
		},
	}).then((res) => res.json());
}

export async function deleteSound(soundId: string) {
	return fetch(`/api/sounds/${soundId}`, {
		method: "DELETE",
	}).then((res) => res.json());
}
