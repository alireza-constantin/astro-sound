import { Input } from "@/components/ui";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";

export function RenameDialog({ boardName, boardId }: { boardName: string, boardId: string }) {
    const nameRef = useRef<HTMLInputElement | null>(null)
	const [loading, setLoading] = useState(false)
	async function handleRename(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		if(!nameRef.current){
			return
		}
		setLoading(true)
        e.preventDefault();
		// console.log(nameRef.current.value)
        try {
			await fetch(`/api/boards/${boardId}`, {
				method: "PUT",
				body: JSON.stringify({name: nameRef.current.value}),
				headers: {
					'content-type': 'application/json'
				}
			});
			window.location.reload()
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
    }

	return (
		<AlertDialog>
			<AlertDialogTrigger className="relative hover:bg-accent w-full flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
				Rename
				<DropdownMenuShortcut>
					<Pencil1Icon />
				</DropdownMenuShortcut>
			</AlertDialogTrigger>
		</AlertDialog>
	);
}
