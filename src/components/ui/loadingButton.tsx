import { ReloadIcon } from "@radix-ui/react-icons";
import type { ReactNode } from "react";

type Props = {
	loading: boolean;
	children: ReactNode;
	type: keyof typeof loadingText;
};

const loadingText = {
	delete: "deleting...",
	rename: "saving...",
};

export function LoadingButton({ children, loading, type }: Props) {
	return loading ? (
		<>
			<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
			<span>{loadingText[type]}</span>
		</>
	) : (
		<>{children}</>
	);
}
