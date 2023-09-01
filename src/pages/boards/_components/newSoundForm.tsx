import { Button } from "@/components/ui";
import { useState, type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from '@radix-ui/react-icons'

type Sound = {
	id: string;
	url: string;
};

const initialData = [
	{ id: "123", url: "http://www.1.com" },
	{ id: "132", url: "http://www.2.com" },
	{ id: "133", url: "http://www.3.com" },
];


	// async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
	// 	e.preventDefault();
	// 	const form = e.target as HTMLFormElement;
	// 	if (form.checkValidity() === false) {
	// 		form.querySelector("input")?.focus();
	// 	}

	// 	// @ts-ignore
	// 	const formData = new FormData(e.target);
	// }


export function NewSoundForm() {
	const [sounds, setSounds] = useState<Array<Sound>>(() => initialData);

    function updateSounds(id: string, target: HTMLInputElement){
            const newUrl = target.value;
            const newSounds = sounds.map((sound) => {
                if(sound.id === id){
                    return {...sound, url: newUrl}
                }
                return sound;
            })
            setSounds(newSounds);
    }


    function onSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
    }


	return (
		<form noValidate onSubmit={onSubmit}  className="space-y-4">
			<div className="grid grid-cols-4 gap-3">
				{sounds.map(({ id, url }) => {
					return (
						<SoundCard key={id}>
							<input
								onChange={(e) => updateSounds(id, e.target)}
								className="bg-transparent focus:outline-none"
								value={url}
							/>
						</SoundCard>
					);
				})}
				<Button onClick={() => setSounds((prevSound) => [...prevSound, {id: String(Math.random()), url: ''}])}>
                    <PlusIcon className="mr-1 h-5 w-5"/>
                    Add New Sound
                </Button>
			</div>
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
