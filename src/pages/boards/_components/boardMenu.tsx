import { Button } from "@/components/ui/button";
import { TrashIcon, Share1Icon } from "@radix-ui/react-icons";
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

type Props = {
	children: ReactNode;
	url: string
};

export function BoardMenu({ children, url }: Props) {
	function handleShareCopy(e: React.MouseEvent<HTMLDivElement>){
		if(navigator.clipboard){
			navigator.clipboard.writeText(url);
		}
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
						{children}
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
