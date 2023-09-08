import { Button } from "@/components/ui";
import { useState, type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import useSWR from "swr";
import { fetcher } from "../_utils/helpers";
import { formatDistance } from "date-fns";
import { createSound, deleteSound, updateSoundName } from "@/utils/apis";
import { CreateSoundSchema } from "@/utils/type";

type Sound = {
	url: string;
	id: string;
	name: string;
	createdAt: string;
	boardId: string;
};

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
	const [soundForm, setSoundForm] = useState<Array<{ id: string }>>([]);

	async function soundSubmitHandler(e: React.FormEvent<HTMLFormElement>, id: string) {
		e.preventDefault();
		// check to see if the form state is valid
		if (!e.currentTarget.checkValidity()) return;
		// parse the form data to get our data from it

		const formData = new FormData(e.currentTarget);
		const data = CreateSoundSchema.parse(Object.fromEntries(formData.entries()));
		setSoundForm((prev) => {
			return prev.filter((p) => p.id !== id);
		});

		await mutate(createSound(boardId, data), {
			optimisticData: [
				...(sounds || []),
				{
					...data,
					// add this properties to get rid of the typescript error
					id: "",
					createdAt: "",
					boardId,
				},
			],
			rollbackOnError: true,
			populateCache: (added, current) => [...(current || []), added],
			revalidate: false,
		});
	}

	async function handleDelete(id: string) {
		await mutate(deleteSound(id), {
			optimisticData: (currentSounds) => {
				return (currentSounds || []).filter((sound) => {
					return sound.id !== id;
				});
			},
			populateCache: (_, currentSounds) => {
				return (currentSounds || []).filter((sound) => {
					return sound.id !== id;
				});
			},
			rollbackOnError: true,
			revalidate: false,
		});
	}

	async function handleUpdate(id: string, name: string) {
		await mutate(updateSoundName(id, name), {
			optimisticData: (currentSounds) => {
				return (currentSounds || []).map((sound) => {
					if(sound.id === id){
						const newSound = {...sound}
						newSound.name = name;
						return newSound
					}
					return sound
				});
			},
			populateCache: (updatedSound, currentSounds) => {
				return (currentSounds || []).map((sound) => {
					if (sound.id === id) {
						const newSound = { ...sound };
						newSound.name = updatedSound.name;
						return newSound;
					}
					return sound;
				});
			},
			rollbackOnError: true,
			revalidate: false,
		});
	}

	if (error) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mb-4">
			{(sounds || []).map(({ id, url, name, createdAt }) => (
				<SoundCard key={id}>
					<div className="flex items-center">
						<input
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
							onBlur={e => handleUpdate(id, e.currentTarget.value)}
						/>
						<span onClick={() => handleDelete(id)} className="cursor-pointer">
							<TrashIcon className="h-5 w-5 hover:text-rose-500" />
						</span>
					</div>
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
			{soundForm.map(({ id }) => (
				<form className="" onSubmit={(e) => soundSubmitHandler(e, id)} noValidate key={id}>
					<SoundCard>
						<FormInput name="name" placeholder="name" type="text" />
						<FormInput name="url" placeholder="url" type="url" />
						<Button className="w-full" type="submit">
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
							id: String(Math.random()),
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
