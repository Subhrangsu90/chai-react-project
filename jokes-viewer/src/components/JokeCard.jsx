import CategoryBadge from "./CategoryBadge";

function JokeCard({ joke }) {
	const { id, content, categories = [] } = joke;

	return (
		<article className="group rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-sm transition hover:border-zinc-600 hover:shadow-lg">
			<div className="mb-4 flex items-center justify-between">
				<p className="text-sm font-semibold text-amber-400">Joke #{id}</p>
				<p className="text-xs text-zinc-500">{content.length} chars</p>
			</div>

			<p className="mb-4 leading-relaxed text-zinc-100">{content}</p>

			<div className="flex flex-wrap gap-2">
				{categories.length > 0 ? (
					categories.map((category) => (
						<CategoryBadge key={`${id}-${category}`} label={category} />
					))
				) : (
					<CategoryBadge label="uncategorized" />
				)}
			</div>
		</article>
	);
}

export default JokeCard;
