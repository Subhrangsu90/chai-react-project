function parseTemperament(temperament) {
	if (!temperament || typeof temperament !== "string") return [];
	return temperament
		.split(",")
		.map((s) => s.trim())
		.filter(Boolean);
}

function TraitMeter({ label, value, max = 5 }) {
	const safe = Math.min(max, Math.max(0, Number(value) || 0));
	const pct = max ? (safe / max) * 100 : 0;

	return (
		<div className="space-y-1">
			<div className="flex items-baseline justify-between gap-2 text-[11px]">
				<span className="font-medium text-zinc-400">{label}</span>
				<span className="tabular-nums text-zinc-500">
					{safe}/{max}
				</span>
			</div>
			<div
				className="h-1.5 overflow-hidden rounded-full bg-zinc-800"
				role="meter"
				aria-valuenow={safe}
				aria-valuemin={0}
				aria-valuemax={max}
				aria-label={label}>
				<div
					className="h-full rounded-full bg-gradient-to-r from-teal-600 to-cyan-500 transition-[width] duration-500"
					style={{ width: `${pct}%` }}
				/>
			</div>
		</div>
	);
}

const TRAITS = [
	["Adaptability", "adaptability"],
	["Affection", "affection_level"],
	["Child-friendly", "child_friendly"],
	["Dog-friendly", "dog_friendly"],
	["Energy", "energy_level"],
	["Grooming needs", "grooming"],
	["Health issues", "health_issues"],
	["Intelligence", "intelligence"],
	["Shedding", "shedding_level"],
	["Social needs", "social_needs"],
	["Stranger-friendly", "stranger_friendly"],
	["Vocalisation", "vocalisation"],
];

function Flag({ children, active }) {
	if (!active) return null;
	return (
		<span className="rounded-md bg-teal-500/15 px-2 py-0.5 text-[11px] font-medium text-teal-300 ring-1 ring-teal-500/25">
			{children}
		</span>
	);
}

function ExternalLink({ href, children }) {
	if (!href) return null;
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="rounded-lg border border-zinc-700/80 bg-zinc-800/50 px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:border-teal-500/40 hover:bg-zinc-800 hover:text-white">
			{children}
		</a>
	);
}

export function CatBreedCard({ cat }) {
	if (!cat) return null;

	const name = cat.name ?? "Unknown breed";
	const image = cat.image;
	const origin = cat.origin;
	const country = cat.country_codes ?? cat.country_code;
	const life = cat.life_span;
	const weight = cat.weight;
	const temperament = parseTemperament(cat.temperament);
	const alt = cat.alt_names?.trim();

	return (
		<article className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/50 shadow-2xl shadow-black/40 ring-1 ring-white/5">
			<div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
				<div className="relative aspect-[4/3] min-h-[220px] bg-zinc-800 md:aspect-auto md:min-h-[420px]">
					{image ? (
						<img
							src={image}
							alt={name}
							className="h-full w-full object-cover"
						/>
					) : (
						<div className="flex h-full min-h-[220px] items-center justify-center text-sm text-zinc-500">
							No image
						</div>
					)}
					<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-zinc-950/30 md:to-zinc-950/90" />
					<div className="absolute bottom-0 left-0 right-0 p-4 md:hidden">
						<h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
							{name}
						</h1>
						{alt ? (
							<p className="mt-0.5 text-sm text-zinc-300">
								Also: {alt}
							</p>
						) : null}
					</div>
				</div>

				<div className="flex flex-col gap-4 p-5 md:p-6 md:pl-5">
					<header className="hidden md:block">
						<h1 className="text-2xl font-bold tracking-tight text-zinc-50 md:text-3xl">
							{name}
						</h1>
						{alt ? (
							<p className="mt-1 text-sm text-zinc-400">
								Also known as {alt}
							</p>
						) : null}
					</header>

					<dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
						<div className="rounded-xl border border-zinc-800/80 bg-zinc-950/40 px-3 py-2">
							<dt className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
								Origin
							</dt>
							<dd className="mt-0.5 font-medium text-zinc-100">
								{origin ?? "—"}
								{country ? (
									<span className="ml-1 text-zinc-500">
										({country})
									</span>
								) : null}
							</dd>
						</div>
						<div className="rounded-xl border border-zinc-800/80 bg-zinc-950/40 px-3 py-2">
							<dt className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
								Life span
							</dt>
							<dd className="mt-0.5 font-medium text-zinc-100">
								{life ? `${life} yrs` : "—"}
							</dd>
						</div>
						<div className="col-span-2 rounded-xl border border-zinc-800/80 bg-zinc-950/40 px-3 py-2 sm:col-span-1">
							<dt className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
								Weight
							</dt>
							<dd className="mt-0.5 font-medium text-zinc-100">
								{weight?.imperial
									? `${weight.imperial} lb`
									: "—"}
								{weight?.metric ? (
									<span className="block text-xs font-normal text-zinc-500">
										{weight.metric} kg
									</span>
								) : null}
							</dd>
						</div>
					</dl>

					{temperament.length > 0 ? (
						<div>
							<p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
								Temperament
							</p>
							<ul className="flex flex-wrap gap-1.5">
								{temperament.map((t) => (
									<li key={t}>
										<span className="inline-block rounded-lg bg-zinc-800 px-2.5 py-1 text-xs text-zinc-200 ring-1 ring-zinc-700/60">
											{t}
										</span>
									</li>
								))}
							</ul>
						</div>
					) : null}

					<div className="flex flex-wrap gap-1.5">
						<Flag active={cat.hypoallergenic === 1}>
							Hypoallergenic
						</Flag>
						<Flag active={cat.lap === 1}>Lap cat</Flag>
						<Flag active={cat.indoor === 1}>Indoor</Flag>
						<Flag active={cat.rex === 1}>Rex coat</Flag>
						<Flag active={cat.hairless === 1}>Hairless</Flag>
						<Flag active={cat.natural === 1}>Natural breed</Flag>
						<Flag active={cat.rare === 1}>Rare</Flag>
					</div>

					{cat.description ? (
						<div className="rounded-xl border border-zinc-800/60 bg-zinc-950/30 p-3">
							<p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
								About
							</p>
							<p className="mt-2 max-h-40 overflow-y-auto text-sm leading-relaxed text-zinc-300 md:max-h-none">
								{cat.description}
							</p>
						</div>
					) : null}

					<div>
						<p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
							Traits (1–5)
						</p>
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
							{TRAITS.map(([label, key]) => (
								<TraitMeter
									key={key}
									label={label}
									value={cat[key]}
								/>
							))}
						</div>
					</div>

					<div className="mt-auto flex flex-wrap gap-2 border-t border-zinc-800/60 pt-4">
						<ExternalLink href={cat.wikipedia_url}>
							Wikipedia
						</ExternalLink>
						<ExternalLink href={cat.cfa_url}>CFA</ExternalLink>
						<ExternalLink href={cat.vetstreet_url}>
							Vetstreet
						</ExternalLink>
						<ExternalLink href={cat.vcahospitals_url}>
							VCA
						</ExternalLink>
					</div>
				</div>
			</div>
		</article>
	);
}
