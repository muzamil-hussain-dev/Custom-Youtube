import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AddVideo = () => {
    const [videoId, setVideoId] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [fetchingTitle, setFetchingTitle] = useState(false);

    // REPLACE THIS WITH YOUR GOOGLE WEB APP URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx3ppEf4tk2vYp9BMivxVf-gSWCC405swBoPibKpxlIfCpAd-u1ixPtM7IzwE0P3fPL/exec';

    // Auto-fetch title when ID changes
    useEffect(() => {
        if (videoId.length === 11) {
            fetchTitle(videoId);
        }
    }, [videoId]);

    const fetchTitle = async (id) => {
        setFetchingTitle(true);
        try {
            const res = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${id}`);
            const data = await res.json();
            if (data.title) {
                setTitle(data.title);
            }
        } catch (err) {
            console.error("Failed to fetch title", err);
        } finally {
            setFetchingTitle(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        if (!videoId) {
            setError('Please enter a Video ID');
            setLoading(false);
            return;
        }

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({ action: 'add', videoId, title }),
            });

            setMessage(`Video added successfully!`);
            setVideoId('');
            setTitle('');
        } catch (err) {
            setError('Failed to add video. Check your connection or the script URL.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-youtube-base text-white p-4 flex flex-col items-center pt-20">
            <div className="w-full max-w-md bg-youtube-secondary p-6 rounded-xl shadow-lg border border-youtube-border">
                <div className="flex items-center gap-4 mb-6">
                    <Link to="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-xl font-bold">Add Video</h1>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">YouTube Video ID</label>
                        <input
                            type="text"
                            placeholder="e.g. dQw4w9WgXcQ"
                            value={videoId}
                            onChange={(e) => setVideoId(e.target.value)}
                            className="w-full bg-[#121212] border border-youtube-border rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors"
                        />
                        {fetchingTitle && <span className="text-xs text-blue-400 mt-1 block">Fetching title...</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Video Title</label>
                        <input
                            type="text"
                            placeholder="Enter video title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-[#121212] border border-youtube-border rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors"
                        />
                    </div>

                    {message && <div className="p-3 bg-green-500/20 text-green-400 rounded-lg text-sm">{message}</div>}
                    {error && <div className="p-3 bg-red-500/20 text-red-400 rounded-lg text-sm">{error}</div>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg font-bold text-black transition-colors ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-white hover:bg-gray-200'
                            }`}
                    >
                        {loading ? 'Adding...' : 'Add Video'}
                    </button>

                    <div className="text-xs text-gray-500 text-center mt-4 border-t border-youtube-border/30 pt-4">
                        Videos are saved to your connected Google Sheet.
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddVideo;
