import { deleteSound, updateSoundName } from "@/utils/apis";
import { TrashIcon } from "@radix-ui/react-icons";
import { formatDistance } from "date-fns";
import { SoundCard } from "./soundCard";
import type { Sound } from "@/db/schema";
import { useState } from "react";

export type AddNewSoundProps = {
	sounds: Sound[] | undefined;
	onDelete: (s: any) => void;
};

export function SoundItems({ onDelete, sounds }: AddNewSoundProps) {
	async function handleDelete(id: string) {
		await deleteSound(id);
		onDelete(id);
	}

	async function handleUpdate(id: string, e: React.FocusEvent<HTMLInputElement, Element>) {
		const name = e.currentTarget.value.trim();
		if (name === "") return;

		try {
			await updateSoundName(id, name);
		} catch (error) {
			// show toast or error outside input field
			e.target.value = e.target.defaultValue;
		}
	}

	return (
		<>
			{(sounds || []).map(({ id, url, name, createdAt }) => (
				<SoundCard key={id}>
					<div className="flex items-center">
						<div>
							<input
								className="bg-transparent capitalize py-1 border-b-[1px] border-transparent focus:border-neutral-800 peer mb-1 font-semibold aria-checked:invalid:border-rose-500 aria-checked:focus:invalid:border-rose-500 placeholder:font-normal placeholder:text-neutral-700  transition-colors duration-100  focus:outline-none w-full"
								defaultValue={name}
								type="text"
								placeholder="Name"
								pattern="^(?!\s+$).+"
								required
								aria-checked="false"
								onInput={(e) => e.currentTarget.defaultValue}
								onFocus={(e) => {
									if (e.currentTarget.getAttribute("aria-checked") === "true")
										return;
									e.currentTarget.setAttribute("aria-checked", "true");
								}}
								onBlur={(e) => handleUpdate(id, e)}
							/>
							<span className="text-[10px] hidden peer-aria-checked:peer-invalid:block text-rose-500">
								name can not be empty
							</span>
						</div>
						<span onClick={() => handleDelete(id)} className="cursor-pointer">
							<TrashIcon className="h-5 w-5 hover:text-rose-500" />
						</span>
					</div>
					<p className="break-words text-base  w-full">{url}</p>
					{createdAt && (
						<time
							className="text-xs text-gray-500"
							dateTime={
								typeof createdAt == "string" ? createdAt : createdAt.toISOString()
							}
						>
							created {formatDistance(new Date(createdAt), new Date())}
						</time>
					)}
				</SoundCard>
			))}
		</>
	);
}
