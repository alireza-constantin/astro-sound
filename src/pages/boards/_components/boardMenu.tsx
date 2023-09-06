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
import { createAndDispatchEvent } from "@/utils/helpers";

type Props = {
	boardId: string;
	boardName: string;
	url: string;
};


export function BoardMenu({ boardId, boardName, url }: Props) {
	
	

	// function handleRename() {
	// 	createAndDispatchEvent({
	// 		eventName: "open",
	// 		detail: {
	// 			title: "Change the board name",
	// 			description: "",
	// 			type: "rename",
	// 			boardId,
	// 			boardName,
	// 		},
	// 	});
	// }

	// function handleShare() {
	// 	console.log(url);
	// }
	
	const actions = createAction({ boardId, boardName, url })


	const MenuItems = [
		{
			name: "delete",
			action: actions.delete,
			icon: <TrashIcon />,
		},
		{
			name: "rename",
			action: actions.reaname,
			icon: <Pencil1Icon />,
		},
		{
			name: "share",
			action: actions.share,
			icon: <TrashIcon />,
		},
	];

	
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="border-none" asChild>
				<Button variant="outline">...</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 mr-2 sm:mr-8">
				<DropdownMenuLabel>Board Options</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					{MenuItems.map((item) => (
						<DropdownMenuItem onClick={item.action} key={item.name} className="capitalize">
								{item.name}
							<DropdownMenuShortcut>
								{item.icon}
							</DropdownMenuShortcut>
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

type CreateActionProps = {
	boardId: string;
	boardName: string;
	url: string
}

function createAction({ boardId, boardName, url }: CreateActionProps){
	return {
		delete: () => {
			createAndDispatchEvent({
				eventName: "open",
				detail: {
					title: "Are you sure?",
					description: "By deleting board all the sounds will be lost too",
					type: "delete",
					boardId,
				},
			});
		},
		reaname: () => {
			createAndDispatchEvent({
				eventName: "open",
				detail: {
					title: "Change the board name",
					description: "",
					type: "rename",
					boardId,
					boardName,
				},
			});
		},
		share: () => {
			console.log(url)
		}
	};
}