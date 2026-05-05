import { useMemo } from "react";

function ControlsBar({
	searchQuery,
	onSearchQueryChange,
	sortKey,
	onSortKeyChange,
	category,
	onCategoryChange,
	categories,
}) {
	const hasCategories = categories.length > 0;

	const sortLabel = useMemo(() => {
		switch (sortKey) {
			case "price_asc":
				return "Price: Low → High";
			case "price_desc":
				return "Price: High → Low";
			case "rating_desc":
				return "Rating: High → Low";
			default:
				return "Sort: Featured";
		}
	}, [sortKey]);

	return (
		<div className="mb-6">
			<div className="flex flex-col gap-3 rounded-2xl border-2 border-black bg-white/5 p-4 shadow-[6px_6px_0px_#000] sm:flex-row sm:items-center sm:justify-between">
				<div className="flex-1">
					<label className="block text-sm font-bold text-zinc-200 mb-2">
						Search products
					</label>
					<input
						value={searchQuery}
						onChange={(e) => onSearchQueryChange(e.target.value)}
						type="text"
						placeholder="Type a product name..."
						className="w-full rounded-xl border-2 border-black bg-black/30 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 outline-none focus:ring-0"
					/>
				</div>

				<div className="flex flex-wrap items-end gap-3">
					<div>
						<label className="block text-sm font-bold text-zinc-200 mb-2">
							Sort
						</label>
						<select
							value={sortKey}
							onChange={(e) => onSortKeyChange(e.target.value)}
							className="rounded-xl border-2 border-black bg-black/30 px-4 py-3 text-zinc-100 outline-none focus:ring-0 min-w-44">
							<option value="featured">Featured</option>
							<option value="price_asc">Price: Low → High</option>
							<option value="price_desc">
								Price: High → Low
							</option>
							<option value="rating_desc">
								Rating: High → Low
							</option>
						</select>
						<p className="mt-2 text-xs font-bold text-zinc-400">
							{sortLabel}
						</p>
					</div>

					{hasCategories ? (
						<div>
							<label className="block text-sm font-bold text-zinc-200 mb-2">
								Category
							</label>
							<select
								value={category}
								onChange={(e) =>
									onCategoryChange(e.target.value)
								}
								className="rounded-xl border-2 border-black bg-black/30 px-4 py-3 text-zinc-100 outline-none focus:ring-0 min-w-40">
								<option value="all">All</option>
								{categories.map((c) => (
									<option
										key={c}
										value={c}>
										{c}
									</option>
								))}
							</select>
						</div>
					) : null}
				</div>
			</div>

			<div className="mt-3 text-xs font-bold text-zinc-400">
				Tip: Click “Refresh” in your browser to re-roll random products.
			</div>
		</div>
	);
}

export default ControlsBar;
