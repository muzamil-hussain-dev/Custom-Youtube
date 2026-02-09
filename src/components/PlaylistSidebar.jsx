import React from 'react';
import { Link } from 'react-router-dom';
import { videos } from '../data/videos';
import { Play } from 'lucide-react';

const PlaylistSidebar = ({ currentVideoId }) => {
    return (
        <div className="flex flex-col gap-2 w-full lg:w-[400px] shrink-0">
            <div className="flex items-center justify-between mb-2 px-1">
                <h3 className="text-xl font-bold text-white">Next Up</h3>
                <button className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">Autoplay is on</button>
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto lg:max-h-[calc(100vh-140px)] scrollbar-hide">
                {videos.map((video) => {
                    const isActive = video.videoId === currentVideoId;
                    return (
                        <Link
                            key={video.id}
                            to={`/watch/${video.videoId}`}
                            className={`flex gap-2 p-2 rounded-xl transition-all group ${isActive ? 'bg-youtube-secondary/80 border border-white/10 ring-1 ring-white/5' : 'hover:bg-youtube-secondary hover:scale-[1.01]'}`}
                        >
                            <div className="relative w-40 min-w-[160px] aspect-video rounded-lg overflow-hidden bg-gray-800 shrink-0">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className={`w-full h-full object-cover transition-opacity ${isActive ? 'opacity-50' : 'opacity-100'}`}
                                />
                                {isActive && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Play className="w-8 h-8 text-white fill-white animate-pulse drop-shadow-lg" />
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-1 min-w-0 py-0.5">
                                <h4 className={`text-sm font-semibold line-clamp-2 leading-tight ${isActive ? 'text-white' : 'text-white group-hover:text-white/90'}`}>
                                    {video.title}
                                </h4>
                                <p className="text-xs text-youtube-textSecondary group-hover:text-youtube-text mt-0.5 transition-colors">{video.channel}</p>
                                <div className="flex items-center gap-1 text-xs text-youtube-textSecondary mt-auto">
                                    <span className="bg-youtube-secondary px-1 py-0.5 rounded text-[10px] text-white/70">New</span>
                                    <span>•</span>
                                    <span>{video.views}</span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default PlaylistSidebar;
