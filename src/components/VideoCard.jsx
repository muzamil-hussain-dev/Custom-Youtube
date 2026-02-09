import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';

const VideoCard = ({ video }) => {
    return (
        <Link to={`/watch/${video.videoId}`} className="group flex flex-col gap-3 cursor-pointer">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-youtube-secondary">
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                        e.target.src = "https://via.placeholder.com/640x360?text=Video+Thumbnail";
                    }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <PlayCircle className="w-12 h-12 text-white drop-shadow-lg" fill="black" />
                </div>
                <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 text-xs font-medium rounded text-white">
                    {/* dynamic duration if available, static for now */}
                    4:20
                </div>
            </div>
            <div className="flex gap-3 px-1">
                {/* Channel Avatar Placeholder */}
                <div className="flex-none mt-0.5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-xs font-bold text-white/50">
                        {video.channel.substring(0, 1)}
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="text-base font-bold text-white line-clamp-2 leading-tight group-hover:text-white/90">
                        {video.title}
                    </h3>
                    <div className="mt-1 text-sm text-youtube-textSecondary">
                        <p className="hover:text-white transition-colors">{video.channel}</p>
                        <div className="flex items-center gap-1">
                            <span>{video.views}</span>
                            <span>•</span>
                            <span>{video.timestamp}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default VideoCard;
