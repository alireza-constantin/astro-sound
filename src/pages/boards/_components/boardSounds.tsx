import { Button } from "@/components/ui";
import { useState, type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";
import { fetcher } from "../_utils/helpers";
import { formatDistance } from "date-fns";

type Sound = {
	url: string;
	id: string;
	name: string;
	createdAt: string;
	boardId: string;
};
type UpdateSound = Omit<Sound, "id">;

type Props = {
	boardId: string;
};

export function Sounds({ boardId }: Props) {
	const {
		data: sounds,
		error,
		isLoading,
		mutate,
	} = useSWR<Array<Sound>>(`/api/sounds/${boardId}`, fetcher);
	const [soundForm, setSoundForm] = useState<Array<Sound>>([]);
	const [loading, setLoading] = useState(false);

	async function soundSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData.entries()) as Sound;
		setLoading(true);
		async function newSound() {
			const res = await fetch(`/api/sounds/${boardId}`, {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"content-type": "application/json",
				},
			}).then((res) => res.json());
			return res;
		}
		if (!sounds) return;
		// console.log("old sounds", oldSounds);
		setSoundForm((prev) => {
			return prev.filter((p) => p.id !== data.id);
		});
		console.log("new Data", data);
		await mutate(newSound(), {
			optimisticData: [
				...sounds,
				{
					...data,
					boardId,
				},
			],
			rollbackOnError: true,
			populateCache: (added, current) => [...(current || []), added],
			revalidate: false,
		});

		setLoading(false);
	}

	if (error) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;
	console.log("sounds", sounds);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mb-4">
			{(sounds || []).map(({ id, url, name, createdAt }) => (
				<SoundCard key={id}>
					<input
						// onChange={(e) => updateSounds(id, e.target.value, "name")}
						className="bg-transparent capitalize py-1 border-b-[1px] border-transparent focus:border-neutral-800 peer mb-1 font-semibold aria-checked:invalid:border-rose-500 aria-checked:focus:invalid:border-rose-500 placeholder:font-normal placeholder:text-neutral-700  transition-colors duration-100  focus:outline-none w-full"
						defaultValue={name}
						type="text"
						placeholder="Name"
						required
						aria-checked="false"
						onFocus={(e) => {
							if (e.currentTarget.getAttribute("aria-checked") === "true") return;
							e.currentTarget.setAttribute("aria-checked", "true");
						}}
					/>
					<p
						// onChange={(e) => updateSounds(id, e.target.value, "url")}
						className="break-words text-base  w-full"
					>
						{url}
					</p>
					{createdAt && (
						<time className="text-xs text-gray-500" dateTime={createdAt}>
							created {formatDistance(new Date(createdAt), new Date())}
						</time>
					)}
				</SoundCard>
			))}
			{soundForm.map(({ id, createdAt }) => (
				<form onSubmit={soundSubmitHandler} noValidate key={id}>
					<SoundCard>
						<FormInput name="name" placeholder="name" type="text" />
						<FormInput name="url" placeholder="url" type="url" />
						<input type="hidden" name="id" value={id} />
						<input type="hidden" name="createdAt" value={createdAt} />
						<Button disabled={loading} className="w-full" type="submit">
							Submit
						</Button>
					</SoundCard>
				</form>
			))}

			<Button
				type="button"
				className="h-full rounded-xl"
				variant={"outline"}
				onClick={() =>
					setSoundForm((prevSound) => [
						...prevSound,
						{
							id: uuidv4(),
							url: "",
							name: "",
							createdAt: new Date().toISOString(),
							boardId: "",
						},
					])
				}
			>
				<PlusIcon className="mr-1 h-5 w-5" />
				Add New Sound
			</Button>
		</div>
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
			aria-checked="false"
			onFocus={(e) => {
				if (e.currentTarget.getAttribute("aria-checked") === "true") return;
				e.currentTarget.setAttribute("aria-checked", "true");
				console.log(e.target.ariaInvalid);
			}}
		/>
	);
}
