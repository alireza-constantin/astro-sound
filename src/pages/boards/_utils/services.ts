import { deleteBoard, renameBoard } from "@/utils/apis";

export async function handleDelete(
	setLoading: React.Dispatch<React.SetStateAction<boolean>>,
	boardId: string,
) {
	setLoading(true);
	try {
		await deleteBoard(boardId);
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
		await renameBoard(boardId, nameRef.current.value);
		window.location.reload();
	} catch (error) {
		console.log(error);
	} finally {
		setLoading(false);
	}
}
