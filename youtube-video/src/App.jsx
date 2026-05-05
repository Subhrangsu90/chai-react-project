import { useState, useEffect } from "react";
import { VideoCard } from "./components/VideoCard";
import "./App.css";

const MOCK_DATA = {
    "kind": "youtube#videoListResponse",
    "items": {
        "kind": "youtube#video",
        "id": "75hqPk6pq5g",
        "snippet": {
            "publishedAt": "2023-07-19T13:16:33Z",
            "channelId": "UCXgGY0wkgOzynnHvSEVmE3A",
            "title": "Flutter Windows Installation",
            "description": "https://hitesh.ai/discord\n\nFacebook: https://www.facebook.com/HiteshChoudharyPage\nInstagram: https://instagram.com/hiteshchoudharyofficial\nhomepage: http://www.hiteshChoudhary.com\n\nDisclaimer:\nIt doesn't feel good to have a disclaimer in every video but this is how the world is right now. \nAll videos are for educational purposes and use them wisely. Any video may have a slight mistake, please take decisions based on your research. This video is not forcing anything on you.\n\nAll Amazon links are affiliate links (If any).",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/75hqPk6pq5g/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/75hqPk6pq5g/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/75hqPk6pq5g/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                },
                "standard": {
                    "url": "https://i.ytimg.com/vi/75hqPk6pq5g/sddefault.jpg",
                    "width": 640,
                    "height": 480
                },
                "maxres": {
                    "url": "https://i.ytimg.com/vi/75hqPk6pq5g/maxresdefault.jpg",
                    "width": 1280,
                    "height": 720
                }
            },
            "channelTitle": "Hitesh Choudhary",
            "tags": [
                "Programming",
                "javascript",
                "flutter",
                "flutter windows"
            ],
            "categoryId": "28",
            "liveBroadcastContent": "none",
            "defaultAudioLanguage": "en"
        },
        "contentDetails": {
            "duration": "PT19M35S",
            "dimension": "2d",
            "definition": "hd",
            "caption": "false",
            "licensedContent": true,
            "projection": "rectangular"
        },
        "statistics": {
            "viewCount": "2955",
            "likeCount": "163",
            "favoriteCount": "0",
            "commentCount": "51"
        }
    }
};

function App() {
	// Initialize with 4 mock videos for demonstration purposes
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const controller = new AbortController();
		let stale = false;

		async function fetchVideos() {
			try {
				setLoading(true);

				const response = await fetch(
					"https://api.freeapi.app/api/v1/public/youtube/videos",
					{
						signal: controller.signal,
					},
				);

				if (!response.ok) {
					throw new Error(String(response.status));
				}

				const result = await response.json();
				console.log("API response:", result);

				if (stale) return;

				if (Array.isArray(result?.data?.data) && result.data.data.length > 0) {
					setVideos(result.data.data);
				}
			} catch (e) {
				if (stale || e?.name === "AbortError") return;
				console.error(e);
				
			} finally {
				if (!stale) {
					setLoading(false);
				}
			}
		}
		
		fetchVideos();

		return () => {
			stale = true;
			controller.abort();
		};
	}, []);

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
			{/* Navbar */}
			<header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
							<path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
						</svg>
					</div>
					<h1 className="text-xl font-bold bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
						PremiumTube
					</h1>
				</div>
			</header>

			{/* Main Content */}
			<main className="p-6 md:p-8 max-w-[1800px] mx-auto">
				{/* Categories */}
				<div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
					{["All", "Programming", "React", "Flutter", "Design", "Podcasts", "Live"].map((cat, i) => (
						<button 
							key={cat}
							className={`whitespace-nowrap px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${i === 0 ? 'bg-zinc-100 text-zinc-950' : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 hover:text-white'}`}
						>
							{cat}
						</button>
					))}
				</div>

				{loading ? (
					<div className="flex justify-center items-center h-[60vh]">
						<div className="relative flex items-center justify-center">
							<div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
							<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 relative z-10"></div>
						</div>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-5 gap-y-10">
						{videos.map((video, index) => (
							<VideoCard key={video.id + index} video={video} />
						))}
					</div>
				)}
			</main>
		</div>
	);
}

export default App;
