import { useEffect, useMemo, useState } from "react";
import ProductList from "./components/ProductList";
import Loader from "./components/Loader";
import EmptyState from "./components/EmptyState";
import ControlsBar from "./components/ControlsBar";

import "./App.css";

function App() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const [searchQuery, setSearchQuery] = useState("");
	const [sortKey, setSortKey] = useState("featured");
	const [category, setCategory] = useState("all");

	useEffect(() => {
		const controller = new AbortController();

		const fetchProducts = async () => {
			try {
				const response = await fetch(
					"https://api.freeapi.app/api/v1/public/randomproducts",
					{ signal: controller.signal },
				);

				const data = await response.json().then((res) => res.data.data);

				setProducts(Array.isArray(data) ? data : []);
			} catch (error) {
				if (error?.name === "AbortError") return;
				console.error(error);
				setProducts([]);
			} finally {
				if (!controller.signal.aborted) setLoading(false);
			}
		};

		fetchProducts();
		return () => controller.abort();
	}, []);

	const categories = useMemo(() => {
		const unique = new Set();
		for (const product of products) {
			if (product?.category) unique.add(product.category);
		}
		return Array.from(unique).sort((a, b) => a.localeCompare(b));
	}, [products]);

	const filteredAndSortedProducts = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();

		let result = products;

		if (category !== "all") {
			result = result.filter((p) => p?.category === category);
		}

		if (query) {
			result = result.filter((p) => {
				const haystack = `${p?.title ?? ""} ${p?.brand ?? ""} ${
					p?.category ?? ""
				}`.toLowerCase();
				return haystack.includes(query);
			});
		}

		const toNumber = (value) =>
			typeof value === "number" ? value : Number(value);
		const sorters = {
			price_asc: (a, b) => toNumber(a?.price) - toNumber(b?.price),
			price_desc: (a, b) => toNumber(b?.price) - toNumber(a?.price),
			rating_desc: (a, b) => toNumber(b?.rating) - toNumber(a?.rating),
		};

		if (sortKey in sorters) {
			result = [...result].sort(sorters[sortKey]);
		}

		return result;
	}, [products, searchQuery, sortKey, category]);

	const showControls = !loading && products.length > 0;

	return (
		<div className="min-h-screen bg-black text-white px-4 py-6 sm:px-6 sm:py-8">
			<header className="mb-6 sm:mb-8">
				<div className="flex items-center justify-between gap-4">
					<h1 className="text-3xl sm:text-4xl font-black tracking-tight">
						Product Store
					</h1>

					<div className="hidden sm:block rounded-2xl border-2 border-black bg-white/5 px-4 py-2 text-sm font-bold shadow-[6px_6px_0px_#000]">
						{products.length} items
					</div>
				</div>

				<p className="mt-2 text-zinc-400 text-sm sm:text-base">
					Search, filter by category, and sort—random products from
					the API.
				</p>
			</header>

			{loading ? (
				<Loader />
			) : products.length > 0 ? (
				<>
					{showControls ? (
						<ControlsBar
							searchQuery={searchQuery}
							onSearchQueryChange={setSearchQuery}
							sortKey={sortKey}
							onSortKeyChange={setSortKey}
							category={category}
							onCategoryChange={setCategory}
							categories={categories}
						/>
					) : null}

					{filteredAndSortedProducts.length > 0 ? (
						<ProductList products={filteredAndSortedProducts} />
					) : (
						<EmptyState
							title="No matches"
							description="Try adjusting your search or category filter."
						/>
					)}
				</>
			) : (
				<EmptyState />
			)}
		</div>
	);
}

export default App;
