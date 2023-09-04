import { DialogContent } from "@/components/dialogContent";
import { Input } from "@/components/ui";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useRef } from "react";

export function RenameDialog({ boardName }: { boardName: string }) {
    const nameRef = useRef<HTMLInputElement | null>(null)
	function handleRename(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        console.log(nameRef.current?.value)
    }

	return (
		<AlertDialog>
			<AlertDialogTrigger className="relative hover:bg-accent w-full flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
				Rename
				<DropdownMenuShortcut>
					<Pencil1Icon />
				</DropdownMenuShortcut>
			</AlertDialogTrigger>
			<DialogContent handleAction={handleRename} title="Changing the board name">
				<Input ref={nameRef} defaultValue={boardName} />
			</DialogContent>
		</AlertDialog>
	);
}
