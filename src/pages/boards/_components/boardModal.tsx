import { Input } from "@/components/ui";
import { Modal } from "@/components/modal";
import type { OpenDialogEventDetail } from "@/utils/type";
import { useEffect, useRef, useState } from "react";
import { createBoardModalService } from "../_utils/services";

const initialState = {
	title: "",
	description: "",
	type: "",
	boardId: "",
	boardName: "",
};

type Service = {
	[name: string]: {
		service: () => Promise<void>;
		text: string;
	};
};

export function BoardModal() {
	const [newName, setNewName] = useState<string | undefined>(undefined);
	const [dialogDetails, setDialogDetails] = useState(() => initialState);
	const [loading, setLoading] = useState(false);
	const triggerRef = useRef<HTMLButtonElement | null>(null);

	const services = createBoardModalService(dialogDetails.boardId, newName);

	const actions: Service = {
		delete: {
			service: services.delete,
			text: "deleting...",
		},

		rename: {
			service: services.rename,
			text: "renaming...",
		},
	};

	async function handleAction() {
		setLoading(true);
		await actions[dialogDetails.type].service();
		setLoading(false);
	}

	useEffect(() => {
		function openDialog(e: Event) {
			const {
				detail: { boardId, description, title, type, boardName },
			} = e as Event & { detail: OpenDialogEventDetail };
			setDialogDetails({
				title,
				type,
				description,
				boardId,
				boardName: boardName || "",
			});
			triggerRef.current?.click();
		}

		document.addEventListener("open", openDialog);
		return () => document.removeEventListener("open", openDialog);
	}, []);

	return (
		<Modal
			desc={dialogDetails.description}
			handleAction={handleAction}
			isLoading={loading}
			title={dialogDetails.title}
			loadingText={actions[dialogDetails.type]?.text || ''}
			ref={triggerRef}
		>
			{dialogDetails.type === "rename" && (
				<Input
					onChange={(e) => setNewName(e.target.value)}
					defaultValue={dialogDetails.boardName}
				/>
			)}
		</Modal>
	);
}
