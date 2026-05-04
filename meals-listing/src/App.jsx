import { useState, useEffect } from "react";

import { MealCard } from "./components/MealCard.jsx";

function App() {
	const [meals, setMeals] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const controller = new AbortController();
		let stale = false;

		async function fetchMeals() {
			try {
				setLoading(true);

				const response = await fetch(
					"https://api.freeapi.app/api/v1/public/meals",
					{
						signal: controller.signal,
					},
				);

				if (!response.ok) {
					throw new Error(String(response.status));
				}

				const result = await response.json();
				if (stale) return;

				setMeals(
					Array.isArray(result?.data?.data) ? result.data.data : [],
				);
			} catch (e) {
				if (stale || e?.name === "AbortError") return;
				console.error(e);
				setMeals([]);
			} finally {
				if (!stale) {
					setLoading(false);
				}
			}
		}
		fetchMeals();

		return () => {
			stale = true;
			controller.abort();
		};
	}, []);

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center px-4">
				<div className="flex flex-col items-center gap-4">
					<div
						className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-amber-500"
						aria-hidden
					/>
					<p className="text-sm text-zinc-400">Loading meals…</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen px-4 pb-16 pt-10 sm:px-6 lg:px-8">
			<header className="mx-auto mb-10 max-w-6xl text-center sm:text-left">
				<p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500/90">
					Recipe browser
				</p>
				<h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
					Meals
				</h1>
				<p className="mt-2 max-w-xl text-zinc-400">
					Browse dishes from the catalog. Each card shows area,
					category, tags, and a sample of ingredients.
				</p>
			</header>

			{meals.length === 0 ? (
				<p className="mx-auto max-w-6xl text-center text-zinc-500">
					No meals found.
				</p>
			) : (
				<ul className="mx-auto grid max-w-6xl list-none grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
					{meals.map((meal) => (
						<li key={meal.idMeal ?? meal.id}>
							<MealCard meal={meal} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default App;
