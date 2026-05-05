function EmptyState({ title, description }) {
	return (
		<div className="text-center mt-20">
			<h2 className="text-2xl font-black">
				{title ?? "No Products Found"}
			</h2>
			<p className="text-zinc-400 mt-2">
				{description ?? "Try refreshing the page"}
			</p>
		</div>
	);
}

export default EmptyState;
