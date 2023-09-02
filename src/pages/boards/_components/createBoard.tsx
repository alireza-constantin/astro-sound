import { Button, Input } from "@/components/ui";
import { Card } from "@/components/ui/card";
import { PlusIcon } from "@radix-ui/react-icons";

export function CreateBoard(){
    return (
		<Card className="p-4">
			<form className="space-y-2">
				<input
					className="bg-transparent px-4 focus:outline-none w-full"
					placeholder="name"
					type="text"
					required
				/>
				<Button type="button" className="w-full rounded-xl" variant={"outline"}>
					Create New Board
					<PlusIcon className="mr-1 h-5 w-5" />
				</Button>
			</form>
		</Card>
	);
}