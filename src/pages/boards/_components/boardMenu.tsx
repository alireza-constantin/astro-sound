import { TrashIcon, Share1Icon, Pencil1Icon } from "@radix-ui/react-icons";
import { Menu } from "@/components/menu";
import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { createAction } from "../_utils/boardActions";

type Props = {
	boardId: string;
	boardName: string;
	url: string;
};

export function BoardMenu({ boardId, boardName, url }: Props) {
	const actions = createAction({ boardId, boardName, url });

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
			icon: <Share1Icon />,
		},
	];

	return (
		<Menu title="Board Options">
			{MenuItems.map((item) => (
				<DropdownMenuItem onClick={item.action} key={item.name} className="capitalize">
					{item.name}
					<DropdownMenuShortcut>{item.icon}</DropdownMenuShortcut>
				</DropdownMenuItem>
			))}
		</Menu>
	);
}

