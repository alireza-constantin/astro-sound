import { DialogContent } from "@/components/dialogContent";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export function DeleteDialog({ boardId }: { boardId: string }) {
	const [loading, setLoading] = useState(false);
	async function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		setLoading(true);
		e.preventDefault();
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

	return (
		<AlertDialog>
			<AlertDialogTrigger className="relative hover:bg-accent w-full flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
				<span>Delete</span>
				<DropdownMenuShortcut>
					<TrashIcon />
				</DropdownMenuShortcut>
			</AlertDialogTrigger>
			<DialogContent
				loading={loading}
				title="Are you sure?"
				handleAction={handleDelete}
				description="By deleting the board all the data and sounds will be lost"
			/>
		</AlertDialog>
	);
}
