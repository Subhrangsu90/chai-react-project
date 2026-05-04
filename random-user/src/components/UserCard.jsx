const cardBase =
	"group relative w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-800/90 " +
	"bg-gradient-to-b from-zinc-900/95 to-zinc-950/95 shadow-xl shadow-black/40 " +
	"backdrop-blur-sm transition-all duration-300 " +
	"hover:border-zinc-700 hover:shadow-2xl hover:shadow-violet-950/25";

export function UserCard({ user, className = "" }) {
	const fullName = [user.name.title, user.name.first, user.name.last]
		.filter(Boolean)
		.join(" ");
	const streetLine = user.location.street
		? `${user.location.street.number} ${user.location.street.name}`
		: "";
	const locationLine = [
		user.location.city,
		user.location.state,
		user.location.country,
	]
		.filter(Boolean)
		.join(", ");

	return (
		<article
			className={[cardBase, "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-violet-500/60 before:to-transparent", className].filter(Boolean).join(" ")}
		>
			<div className="relative p-5 pb-4">
				<div className="flex gap-4">
					<div className="relative shrink-0">
						<div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-violet-500/40 to-fuchsia-500/30 opacity-0 blur-sm transition-opacity group-hover:opacity-100" />
						<img
							className="relative size-24 rounded-full object-cover ring-2 ring-zinc-700/80 ring-offset-2 ring-offset-zinc-950"
							src={user.picture.large}
							alt=""
							width={96}
							height={96}
						/>
					</div>
					<div className="min-w-0 flex-1 pt-0.5">
						<h2 className="truncate text-lg font-semibold tracking-tight text-white">
							{fullName}
						</h2>
						<div className="mt-2 flex flex-wrap gap-1.5">
							<span className="inline-flex items-center rounded-full border border-zinc-700/80 bg-zinc-800/60 px-2 py-0.5 text-[11px] font-medium capitalize text-zinc-200">
								{user.gender}
							</span>
							{user.nat ? (
								<span className="inline-flex items-center rounded-full border border-zinc-700/60 bg-zinc-800/40 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
									{user.nat}
								</span>
							) : null}
						</div>
					</div>
				</div>
			</div>

			<dl className="relative space-y-3 border-t border-zinc-800/80 bg-zinc-950/30 px-5 py-4">
				<div className="grid grid-cols-[5.25rem_1fr] gap-x-3 gap-y-0.5 text-sm">
					<dt className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
						Email
					</dt>
					<dd className="min-w-0 break-words text-zinc-200">
						<a
							className="text-violet-400 underline-offset-2 transition-colors hover:text-violet-300 hover:underline"
							href={`mailto:${user.email}`}
						>
							{user.email}
						</a>
					</dd>
				</div>
				<div className="grid grid-cols-[5.25rem_1fr] gap-x-3 gap-y-0.5 text-sm">
					<dt className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
						Phone
					</dt>
					<dd className="text-zinc-200">{user.phone}</dd>
				</div>
				<div className="grid grid-cols-[5.25rem_1fr] gap-x-3 gap-y-0.5 text-sm">
					<dt className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
						Mobile
					</dt>
					<dd className="text-zinc-200">{user.cell}</dd>
				</div>
				<div className="grid grid-cols-[5.25rem_1fr] gap-x-3 gap-y-0.5 text-sm">
					<dt className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
						Age
					</dt>
					<dd className="text-zinc-200">{user.dob?.age ?? "—"}</dd>
				</div>
				{user.id?.value ? (
					<div className="grid grid-cols-[5.25rem_1fr] gap-x-3 gap-y-0.5 text-sm">
						<dt className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
							{user.id.name ?? "ID"}
						</dt>
						<dd className="break-all text-zinc-200">{user.id.value}</dd>
					</div>
				) : null}
				<div className="border-t border-zinc-800/60 pt-3">
					<dt className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
						Location
					</dt>
					<dd className="mt-1.5 text-sm leading-relaxed text-zinc-300">
						{streetLine ? (
							<>
								{streetLine}
								<br />
							</>
						) : null}
						{locationLine}
						{user.location.postcode != null ? (
							<span className="text-zinc-500">
								{" "}
								· {user.location.postcode}
							</span>
						) : null}
					</dd>
				</div>
			</dl>
		</article>
	);
}
