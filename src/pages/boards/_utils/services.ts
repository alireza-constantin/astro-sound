export async function handleDelete(
	setLoading: React.Dispatch<React.SetStateAction<boolean>>,
	boardId: string,
) {
	setLoading(true);
	try {
		await fetch(`/api/boards/${boardId}`, {
			method: "DELETE",
		});
		window.location.pathname = "/boards";
	} catch (error) {
		console.log(error);
	} finally {
		setLoading(false);
	}
}

export async function handleRename(
	setLoading: React.Dispatch<React.SetStateAction<boolean>>,
	boardId: string,
	nameRef: React.MutableRefObject<HTMLInputElement | null>,
) {
	if (!nameRef.current || nameRef.current.value.trim() === "") {
		return;
	}
	setLoading(true);
	try {
		await fetch(`/api/boards/${boardId}`, {
			method: "PUT",
			body: JSON.stringify({ name: nameRef.current.value }),
			headers: {
				"content-type": "application/json",
			},
		});
		window.location.reload();
	} catch (error) {
		console.log(error);
	} finally {
		setLoading(false);
	}
}
