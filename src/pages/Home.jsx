import React, { useEffect, useState } from 'react';
import { videos as localVideos } from '../data/videos';
import VideoCard from '../components/VideoCard';

const Home = ({ searchQuery }) => {
    const [allVideos, setAllVideos] = useState(localVideos);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx3ppEf4tk2vYp9BMivxVf-gSWCC405swBoPibKpxlIfCpAd-u1ixPtM7IzwE0P3fPL/exec';

    useEffect(() => {
        const fetchSheetVideos = async () => {
            try {
                // Fetch IDs from Google Sheet
                const response = await fetch(GOOGLE_SCRIPT_URL);
                const sheetIds = await response.json();

                if (Array.isArray(sheetIds) && sheetIds.length > 0) {
                    // Turn IDs into video objects
                    const newVideos = sheetIds.map((item, index) => {
                        // Handle both old format (string ID) and new format (object)
                        const id = typeof item === 'object' ? item.videoId : item;
                        const title = typeof item === 'object' ? item.title : '';
                        const dateStr = typeof item === 'object' ? item.date : '';

                        // Parse date for display and filtering
                        let displayTime = "Just now";
                        let uploadDate = null;

                        if (dateStr) {
                            uploadDate = new Date(dateStr);
                            if (!isNaN(uploadDate.getTime())) {
                                const diffInSeconds = Math.floor((new Date() - uploadDate) / 1000);
                                if (diffInSeconds < 60) displayTime = "Just now";
                                else if (diffInSeconds < 3600) displayTime = `${Math.floor(diffInSeconds / 60)} minutes ago`;
                                else if (diffInSeconds < 86400) displayTime = `${Math.floor(diffInSeconds / 3600)} hours ago`;
                                else if (diffInSeconds < 604800) displayTime = `${Math.floor(diffInSeconds / 86400)} days ago`;
                                else displayTime = `${Math.floor(diffInSeconds / 604800)} weeks ago`;
                            }
                        }

                        return {
                            id: `sheet-${index}-${id}`,
                            videoId: id,
                            title: title || `Imported Video ${id}`,
                            channel: "Muzamil Hussain",
                            views: "New",
                            timestamp: displayTime,
                            uploadDate: uploadDate, // Store actual date object for filtering
                            thumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
                            description: "Imported from Google Sheet"
                        };
                    });

                    // Combine with local videos
                    // Filter out duplicates if needed, or just append
                    setAllVideos([...newVideos.reverse(), ...localVideos]);
                }
            } catch (error) {
                console.error("Error fetching videos from sheet:", error);
                // Fallback to just local videos on error
                setAllVideos(localVideos);
            } finally {
                setLoading(false);
            }
        };

        fetchSheetVideos();
    }, []);

    const filteredVideos = allVideos.filter(video => {
        const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            video.channel.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesFilter = true;
        if (activeFilter === 'Recently Uploaded') {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

            if (video.uploadDate) {
                matchesFilter = video.uploadDate >= sevenDaysAgo;
            } else {
                matchesFilter = false;
            }
        }

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="p-4 md:p-6 overflow-y-auto h-full">
            {/* Sample filtering chips */}
            <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                {['All', 'Recently Uploaded'].map((chip) => (
                    <button
                        key={chip}
                        onClick={() => setActiveFilter(chip)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === chip ? 'bg-white text-black' : 'bg-youtube-secondary text-white hover:bg-youtube-hover'}`}
                    >
                        {chip}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex justify-center p-10 text-white">Loading videos...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-8 gap-x-4">
                    {filteredVideos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
