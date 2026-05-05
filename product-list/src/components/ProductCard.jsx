function ProductCard({ product }) {
	const {
		id,
		title,
		price,
		rating,
		brand,
		thumbnail,
		stock,
		category,
		discountPercentage,
	} = product;

	const hasDiscount =
		typeof discountPercentage === "number" && discountPercentage > 0;

	const priceText =
		typeof price === "number"
			? `$${price.toFixed(2)}`
			: String(price ?? "");

	const ratingText =
		typeof rating === "number" ? rating.toFixed(1) : String(rating ?? "");

	const stockText = typeof stock === "number" ? stock : String(stock ?? "");

	return (
		<article
			className="group bg-white/5 rounded-2xl border-2 border-black overflow-hidden shadow-[8px_8px_0px_#000] hover:-translate-y-0.5 hover:shadow-[12px_12px_0px_#000] transition-transform duration-200"
			aria-label={title}>
			<div className="relative">
				<img
					src={thumbnail}
					alt={title}
					className="w-full h-44 object-cover"
					loading="lazy"
				/>

				{hasDiscount ? (
					<div className="absolute top-3 left-3 rounded-xl border-2 border-black bg-black/75 px-3 py-1 text-sm font-black text-white">
						-{discountPercentage}%
					</div>
				) : null}

				<div className="absolute bottom-3 right-3 rounded-xl border-2 border-black bg-black/65 px-3 py-1 text-xs font-black text-white">
					{stockText} in stock
				</div>
			</div>

			<div className="p-4">
				<h2 className="text-lg font-black line-clamp-2 leading-tight">
					{title}
				</h2>

				<div className="mt-1 flex items-center justify-between gap-3">
					<p className="text-xs font-bold text-zinc-300 truncate">
						{brand} • {category}
					</p>

					<span className="shrink-0 rounded-xl border-2 border-black bg-black/30 px-3 py-1 text-sm font-black">
						⭐ {ratingText}
					</span>
				</div>

				<div className="mt-4 flex items-end justify-between gap-3">
					<span className="text-green-300 font-black text-2xl leading-none">
						{priceText}
					</span>

					<span className="text-xs font-black text-zinc-400 uppercase tracking-wide">
						{id ? `ID ${id}` : "Item"}
					</span>
				</div>
			</div>

			<div className="h-1 bg-black/60 group-hover:bg-black transition-colors" />
		</article>
	);
}

export default ProductCard;
