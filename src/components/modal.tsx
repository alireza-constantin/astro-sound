import {
	AlertDialog,
	AlertDialogTrigger,
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
import { forwardRef } from "react";

type ModalProps = {
	title: string;
	desc: string;
	children?: ReactNode;
	isLoading: boolean;
	loadingText: string;
	handleAction: () => Promise<void>;
};

export const Modal = forwardRef<HTMLButtonElement, ModalProps>(
	({ desc, handleAction, isLoading, loadingText, title, children }, ref) => {
		return (
			<AlertDialog>
				<AlertDialogTrigger
					ref={ref}
					className="relative hidden hover:bg-accent w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
				></AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{title}</AlertDialogTitle>
						{desc !== "" && <AlertDialogDescription>{desc}</AlertDialogDescription>}
					</AlertDialogHeader>
					{children}
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							disabled={isLoading}
							onClick={async (e) => {
								e.preventDefault();
								handleAction();
							}}
						>
							<LoadingButton loading={isLoading} text={loadingText}>
								Continue
							</LoadingButton>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	},
);
