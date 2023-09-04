import { ReloadIcon } from "@radix-ui/react-icons";
import type { ReactNode } from "react";

type Props = {
	loading: boolean;
	children: ReactNode;
	loadingText: string;
};

export function LoadingButton({ children, loading, loadingText }: Props) {
	return loading ? (
		<>
			<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
			<span>{loadingText}</span>
		</>
	) : (
		<>{children}</>
	);
}
