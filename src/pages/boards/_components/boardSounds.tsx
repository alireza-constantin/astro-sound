import useSWR from "swr";
import { fetcher } from "../_utils/helpers";
import { AddNewSound } from "./createSound";
import { SoundItems } from "./soundItems";

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
	} = useSWR<Array<Sound>>(`/api/boards/${boardId}`, fetcher);

	if (error) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mb-4">
			<SoundItems mutate={mutate} sounds={sounds} />
			<AddNewSound boardId={boardId} mutate={mutate} sounds={sounds} />
		</div>
	);
}
