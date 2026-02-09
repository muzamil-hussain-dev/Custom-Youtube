// Simplified video data - just IDs and Titles
const videoList = [
    // { id: "1", videoId: "jfKfPfyJRdk", title: "Lofi Hip Hop Radio - Beats to Relax/Study to" },
    // { id: "2", videoId: "4xDzrJKXOOY", title: "Synthwave Radio - Beats to Chill/Game to" },
    // { id: "3", videoId: "M5QY2_8704o", title: "Chillstep Music for Programming / Cyberpunk / Coding" },
    // { id: "4", videoId: "lCOF9LN_Zxs", title: "Peaceful Piano Music" },
    // { id: "5", videoId: "Rb0UmrCXxVA", title: "Mozart - Classical Music for Brain Power" },
    // { id: "6", videoId: "Cnfj6QCGLyA", title: "Beautiful Relaxing Music - Peaceful Piano Music & Guitar Music" },
    // { id: "8", videoId: "Cnfj6QCGLyA", title: "Beautiful Relaxing Music - Peaceful Piano Music & Guitar Music (Copy)" }
];

export const videos = videoList.map(v => ({
    ...v,
    channel: "Muzamil Hussain",
    views: Math.floor(Math.random() * 900 + 100) + "K views", // Random views 100K-999K
    timestamp: Math.floor(Math.random() * 10 + 1) + " months ago", // Random time
    thumbnail: `https://img.youtube.com/vi/${v.videoId}/maxresdefault.jpg`,
    description: "Enjoy this amazing video brought to you by Muzamil Hussain. Don't forget to like, share, and subscribe for more content! \n\nThis video is curated for your listening pleasure. Whether you are studying, coding, or just relaxing, these beats are perfect for you."
}));
