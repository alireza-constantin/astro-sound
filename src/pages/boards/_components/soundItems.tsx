import { deleteSound, updateSoundName } from "@/utils/apis";
import { TrashIcon } from "@radix-ui/react-icons";
import { formatDistance } from "date-fns";
import { SoundCard } from "./soundCard";
import type { KeyedMutator } from "swr";

type Sound = {
	url: string;
	id: string;
	name: string;
	createdAt: string;
	boardId: string;
};

export type AddNewSoundProps = {
	mutate: KeyedMutator<Sound[]>;
	sounds: Sound[] | undefined;
};

export function SoundItems({ mutate, sounds }: AddNewSoundProps) {
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

	console.log(sounds);

	async function handleUpdate(id: string, name: string) {
		await mutate(updateSoundName(id, name), {
			optimisticData: (currentSounds) => {
				return (currentSounds || []).map((sound) => {
					if (sound.id === id) {
						const newSound = { ...sound };
						newSound.name = name;
						return newSound;
					}
					return sound;
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

	return (
		<>
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
							onBlur={(e) => handleUpdate(id, e.currentTarget.value)}
						/>
						<span onClick={() => handleDelete(id)} className="cursor-pointer">
							<TrashIcon className="h-5 w-5 hover:text-rose-500" />
						</span>
					</div>
					<p
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
		</>
	);
}
