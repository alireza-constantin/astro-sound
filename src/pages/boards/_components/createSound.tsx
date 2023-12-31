import { Button } from "@/components/ui";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingButton } from "@/components/ui/loadingButton";
import { createSound } from "@/utils/apis";
import { CreateSoundSchema } from "@/utils/type";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useState, type ReactNode } from "react";

type Sound = {
	url: string;
	id: string;
	name: string;
	createdAt: string;
	boardId: string;
};

export type AddNewSoundProps = {
	// mutate: KeyedMutator<Sound[]>;
	boardId: string;
	// sounds: Sound[] | undefined;
	onSuccess: (s: any) => void;
};

export function AddNewSound({ boardId, onSuccess }: AddNewSoundProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [soundForm, setSoundForm] = useState<Array<{ id: string }>>([]);

	async function soundSubmitHandler(e: React.FormEvent<HTMLFormElement>, id: string) {
		e.preventDefault();
		// check to see if the form state is valid
		if (!e.currentTarget.checkValidity()) {
			e.currentTarget.childNodes.forEach((child) => {
				if (child.nodeName === "INPUT" && child instanceof HTMLInputElement) {
					child.setAttribute("aria-checked", "true");
				}
			});
			return;
		}
		// parse the form data to get our data from it

		const formData = new FormData(e.currentTarget);
		const data = CreateSoundSchema.parse(Object.fromEntries(formData.entries()));
		setIsLoading(true);
		const sound = await createSound(boardId, data);

		setSoundForm((prev) => {
			return prev.filter((p) => p.id !== id);
		});
		setIsLoading(false);
		onSuccess(sound);
	}

	return (
		<>
			{soundForm.map(({ id }) => (
				<SoundCard key={id}>
					<form
						className="space-y-2"
						onSubmit={(e) => soundSubmitHandler(e, id)}
						noValidate
					>
						<FormInput name="name" placeholder="name" type="text" />
						<FormInput name="url" placeholder="url" type="url" />
						<div className="flex gap-1">
							<Button
								disabled={isLoading}
								className="w-full rounded-r-none"
								type="submit"
							>
								<LoadingButton loading={isLoading} text="creating...">
									Create
								</LoadingButton>
							</Button>
							<button
							type="button"
								onClick={() =>
									setSoundForm((prevSound) =>
										prevSound.filter((prev) => prev.id !== id),
									)
								}
								className="rounded-r-md flex justify-center items-center bg-rose-600 hover:bg-rose-500"
							>
								<TrashIcon className="h-5 w-6 text-white" />
							</button>
						</div>
					</form>
				</SoundCard>
			))}
			<Button
				type="button"
				className="h-full min-h-[158px] rounded-xl"
				variant={"outline"}
				onClick={() =>
					setSoundForm((prevSound) => [
						...prevSound,
						{
							id: String(Math.random()),
						},
					])
				}
			>
				<PlusIcon className="mr-1 h-5 w-5" />
				Add New Sound
			</Button>
		</>
	);
}

type FormInputProps = {
	type: string;
	placeholder: string;
	name: string;
};

function FormInput({ name, placeholder, type }: FormInputProps) {
	return (
		<input
			// onChange={(e) => updateSounds(id, e.target.value, "name")}
			className="bg-transparent px-2 py-1 rounded-md border-[1px] border-neutral-800 peer mb-1 font-semibold aria-checked:invalid:border-rose-500 aria-checked:focus:invalid:border-rose-500 placeholder:font-normal placeholder:text-sm placeholder:text-neutral-700  transition-colors duration-100  focus:outline-none w-full"
			name={name}
			type={type}
			placeholder={placeholder}
			required
			pattern="^(?!\s+$).+"
			aria-checked="false"
			onFocus={(e) => {
				if (e.currentTarget.getAttribute("aria-checked") === "true") return;
				e.currentTarget.setAttribute("aria-checked", "true");
			}}
		/>
	);
}

type SoundProps = {
	children: ReactNode;
};

function SoundCard(props: SoundProps) {
	return (
		<Card className="p-4 h-full">
			<CardContent className="p-0 space-y-3">{props.children}</CardContent>
		</Card>
	);
}
