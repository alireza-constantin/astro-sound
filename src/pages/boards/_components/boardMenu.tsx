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
import { createAndDispatchEvent } from "@/utils/helpers";

type Props = {
	children: ReactNode;
	url: string;
};

export function BoardMenu({ boardId, boardName }: { boardId: string; boardName: string }) {
	function handleDelete() {
		createAndDispatchEvent({
			eventName: "open",
			detail: {
				title: "Are you sure",
				description: "delete some shit",
				type: "delete",
				boardId,
			},
		});
	}

	function handleRename() {
		createAndDispatchEvent({
			eventName: "open",
			detail: {
				title: "Change board name",
				description: "",
				type: "rename",
				boardId,
				boardName,
			},
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
					<DropdownMenuItem onClick={handleDelete}>
						Delete
						<DropdownMenuShortcut>
							<TrashIcon />
						</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={handleRename}>
						Rename
						<DropdownMenuShortcut>
							<Pencil1Icon />
						</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => {}}>
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
