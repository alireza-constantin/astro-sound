import { Button } from "@/components/ui";
import { Card } from "@/components/ui/card";
import { createBoard } from "@/utils/apis";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export function CreateBoard() {
	const [loading, setLoading] = useState(false);

	async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!e.currentTarget.checkValidity()) {
			(e.currentTarget.querySelector('#name') as HTMLInputElement)?.focus()
			return;
		}
		setLoading(true);
		const formData = new FormData(e.currentTarget);
		try {
			const res = await createBoard(formData);
			// window.location.pathname = `/boards/${res.id}`;
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Card className="p-4">
			<form noValidate onSubmit={submitHandler}>
				<div className="mb-4">
					<input
						className="bg-transparent peer mb-1 font-semibold aria-checked:invalid:border-b-rose-500 aria-checked:focus:invalid:border-b-rose-500 placeholder:font-normal placeholder:text-neutral-700 pb-1 transition-colors duration-100 border-b-[1px] border-transparent focus:border-neutral-800 focus:outline-none w-full"
						placeholder="Board Name"
						id="name"
						name="name"
						aria-checked="false"
						type="text"
						pattern="[^' ']+"
						autoComplete="off"
						required
						onFocus={(e) => {
							if (e.currentTarget.getAttribute("aria-checked") === "true") return;
							e.currentTarget.setAttribute("aria-checked", "true");
						}}
					/>
					<span className="text-[10px] hidden peer-aria-checked:peer-invalid:block text-rose-500">
						* name is required | white spaces not allowed
					</span>
				</div>
				<Button disabled={loading} type="submit" className="w-full">
					{loading ? (
						<>
							<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
							<span>Creating...</span>
						</>
					) : (
						<>
							<PlusIcon className="mr-1 h-5 w-5" />
							<span>Create New Board</span>
						</>
					)}
				</Button>
			</form>
		</Card>
	);
}
