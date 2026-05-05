function QuoteCard({ quote }) {
	const { content, author, dateAdded, length, tags } = quote;

	return (
		<div className="bg-zinc-950 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 border border-zinc-800/80">
			<p className="text-lg italic text-zinc-100 mb-4">“{content}”</p>

			<div className="border-t border-zinc-800/80 pt-4">
				<h2 className="font-semibold text-zinc-400">— {author}</h2>

				<p className="text-sm text-zinc-500 mt-1">Added: {dateAdded}</p>

				<p className="text-sm text-zinc-500">Length: {length} chars</p>

				<div className="flex flex-wrap gap-2 mt-3">
					{tags.length > 0 ? (
						tags.map((tag, index) => (
							<span
								key={index}
								className="px-2 py-1 bg-zinc-800/80 text-zinc-400 rounded-full text-xs">
								#{tag}
							</span>
						))
					) : (
						<span className="text-xs text-zinc-400">No tags</span>
					)}
				</div>
			</div>
		</div>
	);
}

export default QuoteCard;
