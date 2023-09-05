import type { EventProps, OpenDialogEventDetail } from "./type";

export function createAndDispatchEvent<T extends OpenDialogEventDetail>({
	eventName,
	detail,
}: EventProps & { detail: T }) {
	const openDialogEvent = new CustomEvent<T>(eventName, {
		detail: detail,
	});
	document.dispatchEvent(openDialogEvent);
}
