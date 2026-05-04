const skeleton = "block rounded-md bg-zinc-800/90 animate-pulse";

const cardBase =
	"relative w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-800/90 " +
	"bg-gradient-to-b from-zinc-900/95 to-zinc-950/95 shadow-xl shadow-black/40 " +
	"backdrop-blur-sm before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px " +
	"before:bg-gradient-to-r before:from-transparent before:via-zinc-600/40 before:to-transparent";

export function LoadingCard({ children, className = "" }) {
	return (
		<article
			className={[cardBase, className].filter(Boolean).join(" ")}
			aria-busy="true"
			aria-label="Loading"
		>
			<div className="p-5 pb-4">
				<div className="flex gap-4">
					<span
						className={`${skeleton} size-24 shrink-0 rounded-full ring-2 ring-zinc-800 ring-offset-2 ring-offset-zinc-950`}
					/>
					<div className="flex min-w-0 flex-1 flex-col justify-center gap-2.5 pt-0.5">
						<span className={`${skeleton} h-4 w-[72%] max-w-[11rem]`} />
						<span className={`${skeleton} h-3 w-[42%] max-w-[6.5rem]`} />
					</div>
				</div>
			</div>
			<div className="space-y-2.5 border-t border-zinc-800/80 bg-zinc-950/30 px-5 py-4">
				<span className={`${skeleton} h-3 w-full`} />
				<span className={`${skeleton} h-3 w-[88%]`} />
				<span className={`${skeleton} h-3 w-full`} />
				<span className={`${skeleton} h-3 w-[64%]`} />
			</div>
			{children ? (
				<div className="border-t border-zinc-800/80 px-5 py-3 text-center text-sm text-zinc-500">
					{children}
				</div>
			) : null}
		</article>
	);
}
