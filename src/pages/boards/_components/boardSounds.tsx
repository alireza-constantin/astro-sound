import { AddNewSound } from "./createSound";
import { SoundItems } from "./soundItems";
import type { Sound } from "@/db/schema";
import { useState } from "react";

type Props = {
	boardId: string;
	soundList: Sound[];
};


export function Sounds({ boardId, soundList }: Props) {
	const [sounds, setSounds] = useState(soundList)

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mb-4">
			<SoundItems sounds={sounds} />
			<AddNewSound onSuccess={s => setSounds(prev => [...prev, s])} boardId={boardId} />
		</div>
	);
}
