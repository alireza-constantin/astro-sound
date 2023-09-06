import { createAndDispatchEvent } from "@/utils/helpers";

type CreateActionProps = {
	boardId: string;
	boardName: string;
	url: string;
};

export function createAction({ boardId, boardName, url }: CreateActionProps) {
	return {
		delete: () => {
			createAndDispatchEvent({
				eventName: "open",
				detail: {
					title: "Are you sure?",
					description: "By deleting board all the sounds will be lost too",
					type: "delete",
					boardId,
				},
			});
		},
		reaname: () => {
			createAndDispatchEvent({
				eventName: "open",
				detail: {
					title: "Change the board name",
					description: "",
					type: "rename",
					boardId,
					boardName,
				},
			});
		},
		share: async() => {
			await navigator.clipboard.writeText(url);
		},
	};
}
