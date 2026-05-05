import { useState, useEffect } from "react";

import "./App.css";
import JokeCard from "./components/JokeCard";

function App() {
	const [jokes, setJokes] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const controller = new AbortController();
		let stale = false;

		async function fetchJokes() {
			try {
				setLoading(true);

				const response = await fetch(
					"https://api.freeapi.app/api/v1/public/randomjokes",
					{
						signal: controller.signal,
					},
				);

				if (!response.ok) {
					throw new Error(String(response.status));
				}

				const result = await response.json();

				if (stale) return;

				setJokes(
					Array.isArray(result?.data?.data) ? result.data.data : [],
				);
			} catch (e) {
				if (stale || e?.name === "AbortError") return;
				console.error(e);
				setJokes([]);
			} finally {
				if (!stale) {
					setLoading(false);
				}
			}
		}
		fetchJokes();

		return () => {
			stale = true;
			controller.abort();
		};
	}, []);

	return (
		<div className="min-h-screen bg-zinc-950">
			<div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
				<header className="mb-8">
					<h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
						Jokes Viewer
					</h1>
					<p className="mt-2 text-zinc-400">
						A clean list of random jokes rendered with reusable components.
					</p>
				</header>

				{loading ? (
					<div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-zinc-300">
						Loading jokes...
					</div>
				) : jokes.length === 0 ? (
					<div className="rounded-2xl border border-red-700/40 bg-red-950/20 p-6 text-red-200">
						No jokes found. Please try again in a moment.
					</div>
				) : (
					<section className="grid gap-4 sm:grid-cols-2">
						{jokes.map((joke) => (
							<JokeCard key={joke.id} joke={joke} />
						))}
					</section>
				)}
			</div>
		</div>
	);
}

export default App;
