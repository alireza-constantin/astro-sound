export type EventProps = {
	eventName: string;
};

export type ActionTypes = "delete" | "rename";

export type OpenDialogEventDetail = {
	title: string;
	description: string;
	type: ActionTypes;
    boardId: string;
    boardName?: string;
};
