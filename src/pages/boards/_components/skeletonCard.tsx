import { Card } from "@/components/ui/card";

export function LoadingSkeleton() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mb-4">
			{Array.from({ length: 6 }).map((_, idx) => (
				<SkeletonCard key={idx} />
			))}
		</div>
	);
}

function SkeletonCard() {
	return (
		<Card className="p-5 w-full">
			<div className="animate-pulse">
				<div className="flex justify-between gap-10">
					<div className="h-4 bg-neutral-400 rounded flex-1"></div>
					<div className="h-4 bg-neutral-400 rounded w-5"></div>
				</div>
				<div className="h-3 bg-neutral-400 rounded mt-8"></div>
				<div className="h-3 bg-neutral-400 w-1/2 rounded mt-4"></div>
			</div>
		</Card>
	);
}
