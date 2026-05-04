import { useState, useEffect } from "react";

import { LoadingCard } from "./components/LoadingCard.jsx";
import { UserCard } from "./components/UserCard.jsx";

function App() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const controller = new AbortController();
		let stale = false;

		async function fetchUsers() {
			try {
				setLoading(true);

				const response = await fetch(
					"https://api.freeapi.app/api/v1/public/randomusers",
					{
						signal: controller.signal,
					},
				);

				if (!response.ok) {
					throw new Error(String(response.status));
				}

				const result = await response.json();
				if (stale) return;

				setUsers(
					Array.isArray(result?.data?.data) ? result.data.data : [],
				);
			} catch (e) {
				if (stale || e?.name === "AbortError") return;
				console.error(e);
				setUsers([]);
			} finally {
				if (!stale) {
					setLoading(false);
				}
			}
		}
		fetchUsers();

		return () => {
			stale = true;

			controller.abort();
		};
	}, []);

	return (
		<div className="min-h-screen bg-zinc-950 bg-[radial-gradient(ellipse_85%_55%_at_50%_-18%,rgba(139,92,246,0.14),transparent_55%)] px-4 py-10 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-6xl">
				<header className="mb-10 text-center">
					<h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
						Random Users
					</h1>
				</header>

				{loading ? (
					<>
						<p className="mb-6 text-center text-sm text-zinc-500">
							Fetching people…
						</p>
						<ul className="mx-auto flex max-w-6xl flex-wrap justify-center gap-6">
							{Array.from({ length: 6 }).map((_, i) => (
								<li
									key={i}
									className="flex justify-center">
									<LoadingCard />
								</li>
							))}
						</ul>
					</>
				) : (
					<ul className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{users.map((user) => (
							<li
								key={user.login.uuid}
								className="flex w-full justify-center">
								<UserCard user={user} />
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default App;
