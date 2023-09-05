import { Button } from "@/components/ui/button";
import { TrashIcon, Share1Icon, Pencil1Icon } from "@radix-ui/react-icons";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ReactNode } from "react";
import type { OpenDialogEventDetail } from "@/utils/type";
import { createAndDispatchEvent } from "@/utils/helpers";

type Props = {
	children: ReactNode;
	url: string;
};

export function BoardMenu({ children, url }: Props) {
	async function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		// setLoading(true);
		// e.preventDefault();
		// try {
		// 	await fetch(`/api/boards/asdads`, {
		// 		method: "DELETE",
		// 	});
		// 	window.location.pathname = "/boards";
		// } catch (error) {
		// 	console.log(error);
		// } finally {
		// 	// setLoading(false);
		// }
		console.log("deleted");
	}

	function handleShareCopy(e: React.MouseEvent<HTMLDivElement>) {
		createAndDispatchEvent({
			eventName: "open",
			detail: { title: "Are you sure", description: "delete some shit", type: "delete" },
		});
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="border-none" asChild>
				<Button variant="outline">...</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 mr-2 sm:mr-8">
				<DropdownMenuLabel>Board Options</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={handleShareCopy}>
						Delete
						<DropdownMenuShortcut>
							<TrashIcon />
						</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={handleShareCopy}>
						Rename
						<DropdownMenuShortcut>
							<Pencil1Icon />
						</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={handleShareCopy}>
						Share
						<DropdownMenuShortcut>
							<Share1Icon />
						</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
