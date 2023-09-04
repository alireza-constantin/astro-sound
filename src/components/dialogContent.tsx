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

type Props = {
	title: string;
	description?: string;
	handleAction: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    children?: ReactNode
};

export function DialogContent({ description, handleAction, title, children }: Props) {
	return (
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>{title}</AlertDialogTitle>
				{description && <AlertDialogDescription>{description}</AlertDialogDescription>}
			</AlertDialogHeader>
            {children}
			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction onClick={handleAction}>Continue</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	);
}
