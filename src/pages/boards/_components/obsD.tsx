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
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { LoadingButton } from "@/components/ui/loadingButton";
import type { OpenDialogEventDetail } from "@/utils/type";
import { TrashIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";

function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
	e.preventDefault();
	console.log("delete");
}


export function ObsDialog() {
	const triggerRef = useRef<HTMLButtonElement | null>(null);
	const [dialogTitle, setDialogTitle] = useState("");
	const [dialogDesc, setDialogDesc] = useState("");
	const [dialogType, setDialogType] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		function openDialog(e: Event) {
			// console.log(e.detail)
            const customEvent = e as Event & { detail: OpenDialogEventDetail }
			setDialogTitle(customEvent.detail.title);
			setDialogDesc(customEvent.detail.description);
			setDialogType(customEvent.detail.type);
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
			>
				{/* <span>Delete</span>
				<DropdownMenuShortcut>
					<TrashIcon />
				</DropdownMenuShortcut> */}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
					{dialogDesc && <AlertDialogDescription>{dialogDesc}</AlertDialogDescription>}
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={loading}
						onClick={(e) => {
                            e.preventDefault()
                            console.log(dialogType);
                            if(dialogType === 'delete'){
                                console.log('hello');
                            }
                        }}
					>
						<LoadingButton loading={loading} loadingText="deleting...">
							Continue
						</LoadingButton>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
