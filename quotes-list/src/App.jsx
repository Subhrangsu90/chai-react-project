import { useState, useEffect } from "react";

import LoadingSpinner from "./components/LoadingSpinner";
import EmptyState from "./components/EmptyState";
import QuoteList from "./components/QuoteList";

import "./App.css";

function App() {
	const [quotes, setQuotes] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const controller = new AbortController();
		let stale = false;

		async function fetchQuotes() {
			try {
				setLoading(true);

				const response = await fetch(
					"https://api.freeapi.app/api/v1/public/quotes",
					{
						signal: controller.signal,
					},
				);

				if (!response.ok) {
					throw new Error(String(response.status));
				}

				const result = await response.json();
				console.log(result);
				if (stale) return;

				setQuotes(
					Array.isArray(result?.data?.data) ? result.data.data : [],
				);
			} catch (e) {
				if (stale || e?.name === "AbortError") return;
				console.error(e);
				setQuotes([]);
			} finally {
				if (!stale) {
					setLoading(false);
				}
			}
		}
		fetchQuotes();

		return () => {
			stale = true;
			controller.abort();
		};
	}, []);

	return (
		<>
			<div className="min-h-screen p-6">
				<div className="max-w-6xl mx-auto">
					<h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
						Quotes App
					</h1>

					{loading ? (
						<LoadingSpinner />
					) : quotes.length > 0 ? (
						<QuoteList quotes={quotes} />
					) : (
						<EmptyState />
					)}
				</div>
			</div>
		</>
	);
}

export default App;
