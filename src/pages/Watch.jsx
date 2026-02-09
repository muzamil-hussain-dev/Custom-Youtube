import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import PlaylistSidebar from '../components/PlaylistSidebar';
import { videos } from '../data/videos';
import { ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal, CheckCircle2 } from 'lucide-react';
import ShareModal from '../components/ShareModal';

const Watch = () => {
    const { videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);

    useEffect(() => {
        // If no videoId provided, default to first video
        if (!videoId) {
            setVideo(videos[0]);
            return;
        }

        let targetId = videoId;
        let isSheetVideo = false;

        // Check if it's a sheet video ID (format: sheet-index-youtubeId)
        if (videoId.toString().startsWith('sheet-')) {
            const parts = videoId.split('-');
            if (parts.length >= 3) {
                // The ID is the last part (or join the rest if ID has dashes, though YT IDs usually don't)
                // Actually YT IDs can have dashes. 
                // Our format is `sheet-${index}-${id}`. 
                // So we should slice from the second dash.
                // Let's safe parsed it: parts[0] is sheet, parts[1] is index.
                // The rest is the ID.
                targetId = parts.slice(2).join('-');
                isSheetVideo = true;
            }
        }

        const foundVideo = videos.find(v => v.videoId === targetId);

        if (foundVideo) {
            setVideo(foundVideo);
        } else if (isSheetVideo) {
            // Create a temporary video object for sheet videos
            // We don't have the title unless we fetch it, but usually the user comes from Home
            // where we could pass state. For now, use a generic title or "Loading Title..."
            // Ideally, we'd fetch the sheet here too, but let's make it actionable first.
            setVideo({
                id: videoId,
                videoId: targetId,
                title: "Imported Video", // Placeholder
                channel: "Muzamil Hussain",
                views: "New",
                timestamp: "Just now",
                description: "Video from Google Sheet",
            });
        } else {
            // If not found locally and not explicitly marked as sheet, 
            // assume the ID passed in URL IS the video ID (e.g. from VideoCard which uses videoId)
            setVideo({
                id: videoId,
                videoId: targetId, // Use the parameter as the ID
                title: "Playing Video", // Generic title since we don't have it
                channel: "Muzamil Hussain",
                views: "Watching",
                timestamp: "Just now",
                description: "Now playing",
            });
        }

        window.scrollTo(0, 0);
        setIsSubscribed(false);
        setIsLiked(false);
    }, [videoId]);

    const handleShare = () => {
        setShowShareModal(true);
    };

    const handleDownload = () => {
        alert("Downloading video...");
        // Use a publicly available sample video file for demonstration
        const sampleVideoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";

        const link = document.createElement('a');
        link.href = sampleVideoUrl;
        link.download = `${video.title || 'video'}.mp4`;
        link.target = "_blank"; // Open in new tab if download is blocked
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!video) return <div className="flex items-center justify-center p-20 text-white">Loading...</div>;

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 max-w-[1800px] mx-auto w-full relative">
            <ShareModal
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
                video={video}
            />

            <div className="flex-1 min-w-0">
                <VideoPlayer videoId={video.videoId} />

                <div className="mt-4">
                    <h1 className="text-xl md:text-2xl font-bold line-clamp-2 text-white">{video.title}</h1>

                    <div className="flex flex-col md:flex-row md:items-center justify-between mt-3 gap-4 border-b border-youtube-border/30 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white text-lg shrink-0">
                                {video.channel[0]}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                    <h3 className="text-base font-bold whitespace-nowrap text-white">{video.channel}</h3>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-gray-400 fill-black" />
                                </div>
                                <p className="text-xs text-youtube-textSecondary">1.2M subscribers</p>
                            </div>
                            <button
                                onClick={() => setIsSubscribed(!isSubscribed)}
                                className={`ml-4 px-4 py-2 text-sm font-semibold rounded-full transition-colors ${isSubscribed
                                    ? 'bg-youtube-secondary text-white hover:bg-youtube-hover'
                                    : 'bg-white text-black hover:bg-gray-200'
                                    }`}
                            >
                                {isSubscribed ? 'Subscribed' : 'Subscribe'}
                            </button>
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide text-white">
                            <div className="flex items-center bg-youtube-secondary rounded-full overflow-hidden h-9">
                                <button
                                    onClick={() => setIsLiked(!isLiked)}
                                    className="flex items-center gap-2 px-4 h-full hover:bg-youtube-hover transition-colors border-r border-youtube-border/30"
                                >
                                    <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-white text-white' : ''}`} />
                                    <span className="text-sm font-medium">{isLiked ? '12K+1' : '12K'}</span>
                                </button>
                                <button className="px-4 h-full hover:bg-youtube-hover transition-colors">
                                    <ThumbsDown className="w-4 h-4" />
                                </button>
                            </div>

                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 px-4 h-9 bg-youtube-secondary rounded-full hover:bg-youtube-hover transition-colors"
                            >
                                <Share2 className="w-4 h-4" />
                                <span className="text-sm font-medium">Share</span>
                            </button>

                            <button
                                onClick={handleDownload}
                                className="hidden md:flex items-center gap-2 px-4 h-9 bg-youtube-secondary rounded-full hover:bg-youtube-hover transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                <span className="text-sm font-medium">Download</span>
                            </button>

                            <button
                                onClick={handleShare}
                                className="w-9 h-9 flex items-center justify-center bg-youtube-secondary rounded-full hover:bg-youtube-hover transition-colors"
                            >
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 p-4 bg-youtube-secondary/50 rounded-xl text-sm hover:bg-youtube-secondary/80 transition-colors cursor-pointer text-white">
                        <div className="flex gap-2 font-bold mb-1">
                            <span>{video.views}</span>
                            <span>{video.timestamp}</span>
                        </div>
                        <p className="line-clamp-2 text-white/90">
                            Listen to {video.title} by {video.channel}. This includes a curated selection of best tracks for your personal playlist. Enjoy high quality audio with no ads.
                        </p>
                        <button className="mt-1 font-bold text-white/70 hover:text-white">Show more</button>
                    </div>
                </div>
            </div>

            {/* Playlist sidebar sits on the right on large screens, loops to bottom on small */}
            <PlaylistSidebar currentVideoId={video.videoId} />
        </div>
    );
};

export default Watch;
