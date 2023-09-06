import { ReloadIcon } from "@radix-ui/react-icons";
import type { ReactNode } from "react";

type Props = {
	loading: boolean;
	children: ReactNode;
	text: string;
};

export function LoadingButton({ children, loading, text }: Props) {
	return loading ? (
		<>
			<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
			<span>{text}</span>
		</>
	) : (
		<>{children}</>
	);
}
