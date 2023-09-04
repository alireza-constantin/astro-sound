import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/dialog";
import type { ReactNode } from "react";
import { LoadingButton } from "./ui/loadingButton";

type Props = {
	title: string;
	description?: string;
	handleAction: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    children?: ReactNode,
	loading: boolean
};

export function DialogContent({ description, handleAction, title, loading ,children }: Props) {
	return (
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>{title}</AlertDialogTitle>
				{description && <AlertDialogDescription>{description}</AlertDialogDescription>}
			</AlertDialogHeader>
            {children}
			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction disabled={loading} onClick={handleAction}>
					<LoadingButton loading={loading} loadingText="deleting..." >
						Continue
					</LoadingButton>
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	);
}
