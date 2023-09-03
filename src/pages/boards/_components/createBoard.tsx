import { Button } from "@/components/ui";
import { Card } from "@/components/ui/card";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export function CreateBoard() {
	const [loading, setLoading] = useState(false);

	async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);
		const formData = new FormData(e.currentTarget);
		const name = formData.get("name");
		if (!name || name.toString().trim() === "") return;
		try {
			const res = await fetch("/api/boards/new", {
				body: formData,
				method: "POST",
			}).then((res) => res.json());
			window.location.pathname = `/boards/${res.boardId}`;
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Card className="p-4">
			<form onSubmit={submitHandler} className="space-y-2">
				<input
					className="bg-transparent px-4 focus:outline-none w-full"
					placeholder="name"
					name="name"
					type="text"
					required
				/>
				<Button
					disabled={loading}
					type="submit"
					className="w-full rounded-xl"
					variant={"outline"}
				>
					{loading ? (
						<>
							<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
							<span>Creating...</span>
						</>
					) : (
						<>
							<span>Create New Board</span>
							<PlusIcon className="mr-1 h-5 w-5" />
						</>
					)}
				</Button>
			</form>
		</Card>
	);
}
