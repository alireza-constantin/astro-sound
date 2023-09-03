import { Button } from "@/components/ui";
import { useState, type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";

type Sound = {
	url: string;
	id: string;
};

type Props = {
	boardId: string,
	soundList: Array<Sound>
}


export function NewSoundForm({ boardId, soundList }: Props) {
	const [sounds, setSounds] = useState<Array<Sound>>(() => soundList);
	const [loading, setLoading] = useState(false);

	function updateSounds(id: string, target: HTMLInputElement) {
		const newUrl = target.value;
		const newSounds = sounds.map((sound) => {
			if (sound.id === id) {
				return { ...sound, url: newUrl };
			}
			return sound;
		});
		setSounds(newSounds);
	}

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		setLoading(true);
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		if (form.checkValidity() === false) {
			// todo: validate the inputs
			return;
		}

		const soundsWithBoardId = sounds.map((sound) => ({ url: sound.url, boardId }));
		// try {
		// 	await fetch("/api/sounds/new", {
		// 		body: JSON.stringify(soundsWithBoardId),
		// 		method: "POST",
		// 		headers: {
		// 			"content-type": "application/json",
		// 		},
		// 	});
		// } catch (error) {
		// 	// handle error
		// 	console.log(error);
		// } finally {
		// 	setLoading(false);
		// }
		const wait = await new Promise((res) => setTimeout(() => res(1), 1000));
		setLoading(false);
	}

	return (
		<form noValidate onSubmit={onSubmit} className="space-y-4">
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
				{sounds.map(({ id, url }) => {
					return (
						<SoundCard key={id}>
							<input
								onChange={(e) => updateSounds(id, e.target)}
								className="bg-transparent focus:outline-none w-full"
								value={url}
								type="url"
								required
							/>
						</SoundCard>
					);
				})}
				<Button
					type="button"
					className="h-full rounded-xl"
					variant={"outline"}
					onClick={() =>
						setSounds((prevSound) => [
							...prevSound,
							{ id: String(Math.random()), url: "" },
						])
					}
				>
					<PlusIcon className="mr-1 h-5 w-5" />
					Add New Sound
				</Button>
			</div>
			<Button disabled={loading} type="submit" className="w-full">
				{loading ? (
					<>
						<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
						<span>saving...</span>
					</>
				) : (
					<>
						<PlusIcon className="mr-1 h-5 w-5" />
						Save Sounds
					</>
				)}
			</Button>
		</form>
	);
}

type SoundProps = {
	children: ReactNode;
};

function SoundCard(props: SoundProps) {
	return (
		<Card className="px-4 py-2">
			<CardContent className="p-0">{props.children}</CardContent>
		</Card>
	);
}
