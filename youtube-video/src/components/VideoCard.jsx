import React from 'react';
import { formatDuration, formatTimeAgo, formatViews } from '../utils/formatters';

export function VideoCard({ video }) {
  // If the prop is structured like the user's sample where "items" is the actual video object
  const data = video.items ? video.items : video;
  
  const snippet = data?.snippet;
  const statistics = data?.statistics;
  const contentDetails = data?.contentDetails;

  if (!snippet) return null;

  const thumbnail = snippet.thumbnails?.maxres?.url || snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url;
  const title = snippet.title;
  const channelTitle = snippet.channelTitle;
  const viewCount = statistics?.viewCount ? formatViews(statistics.viewCount) : '0';
  const publishedAt = snippet.publishedAt ? formatTimeAgo(snippet.publishedAt) : '';
  const duration = contentDetails?.duration ? formatDuration(contentDetails.duration) : '';

  // Get first letter of channel for avatar placeholder
  const channelInitial = channelTitle ? channelTitle.charAt(0).toUpperCase() : 'C';

  return (
    <div className="group flex flex-col gap-3 cursor-pointer">
      {/* Thumbnail Container */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-800 ring-1 ring-white/10 shadow-lg">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {duration && (
          <div className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-md text-zinc-100 text-[11px] font-semibold px-1.5 py-0.5 rounded-md">
            {duration}
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="flex gap-3 pr-4">
        {/* Channel Avatar Placeholder */}
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-md ring-1 ring-white/10">
            {channelInitial}
          </div>
        </div>

        {/* Text Details */}
        <div className="flex flex-col overflow-hidden">
          <h3 className="text-zinc-100 font-semibold text-base line-clamp-2 leading-snug group-hover:text-indigo-400 transition-colors duration-200">
            {title}
          </h3>
          <div className="text-zinc-400 text-sm mt-1 flex flex-col font-medium">
            <span className="hover:text-zinc-200 transition-colors duration-200 truncate">{channelTitle}</span>
            <div className="flex items-center gap-1.5 text-[13px] mt-0.5">
              <span>{viewCount} views</span>
              <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
              <span>{publishedAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
