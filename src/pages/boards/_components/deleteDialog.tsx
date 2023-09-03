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
			<AlertDialogTrigger className="flex flex-1 justify-between items-center">
				Delete
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
