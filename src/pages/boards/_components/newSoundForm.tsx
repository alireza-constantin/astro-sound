import { Button } from "@/components/ui";
import { useState, type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from '@radix-ui/react-icons'

type Sound = {
	id: string;
	url: string;
};

export function NewSoundForm() {
	const [sounds, setSounds] = useState<Array<Sound>>([]);

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


    async function onSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

			const form = e.target as HTMLFormElement;
			if (form.checkValidity() === false) {
                // todo: validate the inputs
                return;
			}
            


            await fetch('/api/boards/new', {
                body: JSON.stringify(sounds),
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                }
            })

    }


	return (
		<form noValidate onSubmit={onSubmit}  className="space-y-4">
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
				<Button type="button" className="h-full rounded-xl" variant={'outline'} onClick={() => setSounds((prevSound) => [...prevSound, {id: String(Math.random()), url: ''}])}>
                    <PlusIcon className="mr-1 h-5 w-5"/>
                    Add New Sound
                </Button>
			</div>
            <Button type="submit" className="w-full" >Save Sounds</Button>
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
