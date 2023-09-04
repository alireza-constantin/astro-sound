import { DialogContent } from "@/components/dialogContent";
import {
	AlertDialog,
	AlertDialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { TrashIcon } from "@radix-ui/react-icons";

export function DeleteDialog() {
	function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
		e.preventDefault()
		e.stopPropagation();
		console.log('hello');
	}
	
	return (
		<AlertDialog>
			<AlertDialogTrigger className="relative hover:bg-accent w-full flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
				<span>Delete</span>
				<DropdownMenuShortcut>
					<TrashIcon />
				</DropdownMenuShortcut>
			</AlertDialogTrigger>
			<DialogContent title="Are you sure?" handleAction={handleDelete} description="By deleting the board all the data and sounds be lost" />
		</AlertDialog>
	);
}
