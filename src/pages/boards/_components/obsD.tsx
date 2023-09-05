import { Input } from "@/components/ui";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/dialog";
import { LoadingButton } from "@/components/ui/loadingButton";
import type { OpenDialogEventDetail, ActionTypes } from "@/utils/type";
import { useEffect, useRef, useState } from "react";

async function handleDelete(
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

async function handleRename(
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


export function NewBoardMenu() {
	const nameRef = useRef<HTMLInputElement | null>(null);
	const triggerRef = useRef<HTMLButtonElement | null>(null);
	const [dialogDetails, setDialogDetails] = useState({
		title: "",
		desc: "",
		type: "",
		boardId: "",
		boardName: "",
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		function openDialog(e: Event) {
			const { detail } = e as Event & { detail: OpenDialogEventDetail };
			setDialogDetails((_) => ({
				title: detail.title,
				type: detail.type,
				desc: detail.description,
				boardId: detail.boardId,
				boardName: detail.boardName ? detail.boardName : "",
			}));
			triggerRef.current?.click();
		}

		document.addEventListener("open", openDialog);
		return () => document.removeEventListener("open", openDialog);
	});

	return (
		<AlertDialog>
			<AlertDialogTrigger
				ref={triggerRef}
				className="relative hidden hover:bg-accent w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
			></AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{dialogDetails.title}</AlertDialogTitle>
					{dialogDetails.desc !== "" && (
						<AlertDialogDescription>{dialogDetails.desc}</AlertDialogDescription>
					)}
				</AlertDialogHeader>
				{dialogDetails.type === "rename" && (
					<Input ref={nameRef} defaultValue={dialogDetails.boardName} />
				)}
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={loading}
						onClick={(e) => {
							e.preventDefault();
							if (dialogDetails.type === "delete") {
								handleDelete(setLoading, dialogDetails.boardId);
							}
							if (dialogDetails.type === "rename") {
								handleRename(setLoading, dialogDetails.boardId, nameRef);
							}
						}}
					>
						<LoadingButton loading={loading} type={dialogDetails.type as ActionTypes}>
							Continue
						</LoadingButton>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
