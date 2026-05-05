function CategoryBadge({ label }) {
	return (
		<span className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-medium uppercase tracking-wide text-zinc-200">
			{label}
		</span>
	);
}

export default CategoryBadge;
