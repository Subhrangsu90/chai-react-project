function collectIngredients(meal) {
	const rows = [];
	for (let i = 1; i <= 20; i += 1) {
		const raw = meal[`strIngredient${i}`];
		if (!raw || !String(raw).trim()) continue;
		const measure = meal[`strMeasure${i}`];
		rows.push({
			name: String(raw).trim(),
			measure: measure ? String(measure).trim() : "",
		});
	}
	return rows;
}

function parseTags(strTags) {
	if (!strTags || typeof strTags !== "string") return [];
	return strTags
		.split(",")
		.map((t) => t.trim())
		.filter(Boolean);
}

export function MealCard({ meal }) {
	const title = meal.strMeal ?? "Untitled meal";
	const thumb = meal.strMealThumb;
	const category = meal.strCategory;
	const area = meal.strArea;
	const tags = parseTags(meal.strTags);
	const youtube = meal.strYoutube;
	const ingredients = collectIngredients(meal);
	const preview = ingredients.slice(0, 6);
	const extraCount = Math.max(0, ingredients.length - preview.length);

	return (
		<article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 shadow-lg shadow-black/20 ring-1 ring-white/5 transition duration-300 hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-900/10 hover:ring-amber-500/10">
			<div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
				{thumb ? (
					<img
						src={thumb}
						alt={title}
						className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
					/>
				) : (
					<div className="flex h-full items-center justify-center text-sm text-zinc-500">
						No image
					</div>
				)}
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
				<div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
					{category ? (
						<span className="rounded-full bg-amber-500/90 px-2.5 py-0.5 text-xs font-medium text-zinc-950">
							{category}
						</span>
					) : null}
					{area ? (
						<span className="rounded-full bg-zinc-950/70 px-2.5 py-0.5 text-xs font-medium text-zinc-200 ring-1 ring-white/10 backdrop-blur-sm">
							{area}
						</span>
					) : null}
				</div>
			</div>

			<div className="flex flex-1 flex-col gap-3 p-4">
				<div>
					<h2 className="text-lg font-semibold leading-snug tracking-tight text-zinc-50">
						{title}
					</h2>
					{tags.length > 0 ? (
						<ul className="mt-2 flex flex-wrap gap-1.5">
							{tags.map((tag) => (
								<li key={tag}>
									<span className="inline-block rounded-md bg-zinc-800 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-zinc-400">
										{tag}
									</span>
								</li>
							))}
						</ul>
					) : null}
				</div>

				{preview.length > 0 ? (
					<div>
						<p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
							Ingredients
						</p>
						<ul className="space-y-1 text-sm text-zinc-300">
							{preview.map((row, index) => (
								<li
									key={`${index}-${row.name}`}
									className="flex gap-2 border-b border-zinc-800/60 py-1 last:border-0">
									<span className="min-w-0 flex-1 truncate text-zinc-100">
										{row.name}
									</span>
									{row.measure ? (
										<span className="shrink-0 text-xs text-zinc-500">
											{row.measure}
										</span>
									) : null}
								</li>
							))}
						</ul>
						{extraCount > 0 ? (
							<p className="mt-1.5 text-xs text-zinc-500">
								+{extraCount} more
							</p>
						) : null}
					</div>
				) : null}

				<div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
					{youtube ? (
						<a
							href={youtube}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 rounded-lg bg-red-600/90 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-500">
							<span aria-hidden>▶</span>
							Watch
						</a>
					) : null}
				</div>
			</div>
		</article>
	);
}
