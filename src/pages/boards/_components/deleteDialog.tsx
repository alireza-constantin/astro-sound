import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuShortcut, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { TrashIcon } from "@radix-ui/react-icons";

export function DeleteDialog() {
	return (
		<AlertDialog>
			<AlertDialogTrigger className="relative hover:bg-accent w-full flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
				<span>Delete</span>
				<DropdownMenuShortcut>
					<TrashIcon />
				</DropdownMenuShortcut>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription></AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
