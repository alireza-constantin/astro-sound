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