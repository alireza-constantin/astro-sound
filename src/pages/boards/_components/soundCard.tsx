import { Card, CardContent } from "@/components/ui/card";
import type { ReactNode } from "react";

type SoundProps = {
	children: ReactNode;
};

export function SoundCard(props: SoundProps) {
	return (
		<Card className="p-4 h-full">
			<CardContent className="p-0 space-y-3">{props.children}</CardContent>
		</Card>
	);
}
