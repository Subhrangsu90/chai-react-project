import { useState, useEffect, useCallback, useRef } from "react";

import { CatBreedCard } from "./components/CatBreedCard.jsx";

import "./App.css";

function normalizeCatPayload(data) {
	if (!data) return null;
	if (Array.isArray(data)) return data[0] ?? null;
	if (typeof data === "object") return data;
	return null;
}

const API_URL = "https://api.freeapi.app/api/v1/public/cats/cat/random";

function App() {
	const [cat, setCat] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const requestRef = useRef(null);

	const load = useCallback(async () => {
		requestRef.current?.abort();
		const controller = new AbortController();
		requestRef.current = controller;

		setLoading(true);
		setError(null);

		try {
			const response = await fetch(API_URL, {
				signal: controller.signal,
			});

			if (!response.ok) {
				throw new Error(`Request failed (${response.status})`);
			}

			const result = await response.json();
			if (requestRef.current !== controller) return;

			setCat(normalizeCatPayload(result?.data));
		} catch (e) {
			if (e?.name === "AbortError") return;
			if (requestRef.current !== controller) return;
			console.error(e);
			setError(e instanceof Error ? e.message : "Something went wrong");
			setCat(null);
		} finally {
			if (requestRef.current === controller) {
				setLoading(false);
			}
		}
	}, []);

	useEffect(() => {
		load();
		return () => {
			const current = requestRef.current;
			requestRef.current = null;
			current?.abort();
		};
	}, [load]);

	return (
		<div className="min-h-screen px-4 py-10 sm:px-6">
			<div className="mx-auto max-w-5xl">
				<div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<h1 className="text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl">
							Random cat breed
						</h1>
						<p className="mt-1 text-sm text-zinc-400">
							From the FreeAPI cats endpoint — traits,
							temperament, and links in one card.
						</p>
					</div>
					<button
						type="button"
						onClick={() => load()}
						disabled={loading}
						className="shrink-0 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-900/30 transition hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50">
						{loading ? "Loading…" : "Another breed"}
					</button>
				</div>

				{error ? (
					<div
						className="rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-200"
						role="alert">
						{error}
					</div>
				) : null}

				{loading && !cat ? (
					<div
						className="flex min-h-[320px] items-center justify-center rounded-2xl border border-zinc-800/80 bg-zinc-900/40 text-zinc-500"
						aria-busy="true"
						aria-live="polite">
						Loading breed…
					</div>
				) : null}

				{!loading && !cat && !error ? (
					<p className="text-center text-zinc-500">
						No breed data returned.
					</p>
				) : null}

				{cat ? (
					<div
						className={
							loading ? "opacity-60 transition-opacity" : ""
						}>
						<CatBreedCard cat={cat} />
					</div>
				) : null}
			</div>
		</div>
	);
}

export default App;
