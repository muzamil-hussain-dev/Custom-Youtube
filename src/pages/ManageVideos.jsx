import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trash2, Edit2, Save, X, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManageVideos = () => {
    // REPLACE THIS WITH YOUR GOOGLE WEB APP URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx3ppEf4tk2vYp9BMivxVf-gSWCC405swBoPibKpxlIfCpAd-u1ixPtM7IzwE0P3fPL/exec';

    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Edit State
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ videoId: '', title: '' });
    const [processLoading, setProcessLoading] = useState(false);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        setLoading(true);
        try {
            const res = await fetch(GOOGLE_SCRIPT_URL);
            const data = await res.json();
            // Supports both old format (array of IDs) and new format (array of objects)
            const parsedVideos = data.map(item => {
                if (typeof item === 'string') return { videoId: item, title: '' };
                return item;
            });
            setVideos(parsedVideos.reverse());
        } catch (err) {
            console.error("Failed to fetch videos", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this video?')) return;

        setProcessLoading(true);
        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({ action: 'delete', videoId: id })
            });
            // Optimistic removal
            setVideos(videos.filter(v => v.videoId !== id));
        } catch (err) {
            alert('Failed to delete');
        } finally {
            setProcessLoading(false);
        }
    };

    const startEdit = (video) => {
        setEditingId(video.videoId);
        setEditForm({ videoId: video.videoId, title: video.title });
    };

    const handleUpdate = async () => {
        setProcessLoading(true);
        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({
                    action: 'edit',
                    originalVideoId: editingId,
                    newVideoId: editForm.videoId,
                    newTitle: editForm.title
                })
            });

            // Optimistic update
            setVideos(videos.map(v => v.videoId === editingId ? { ...v, videoId: editForm.videoId, title: editForm.title } : v));
            setEditingId(null);
        } catch (err) {
            alert('Failed to update');
        } finally {
            setProcessLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-youtube-base text-white p-4 lg:p-10 pt-20">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-2xl font-bold">Manage Videos</h1>
                </div>

                <div className="bg-youtube-secondary rounded-xl border border-youtube-border overflow-hidden">
                    <div className="p-4 border-b border-youtube-border/30 flex justify-between items-center">
                        <h2 className="font-bold">Video List ({videos.length})</h2>
                        <button onClick={fetchVideos} className="text-sm text-blue-400 hover:text-blue-300">Refresh</button>
                    </div>

                    {loading ? (
                        <div className="p-10 flex flex-col items-center justify-center text-gray-400">
                            <Loader2 className="w-8 h-8 animate-spin mb-2" />
                            Loading videos...
                        </div>
                    ) : videos.length === 0 ? (
                        <div className="p-10 text-center text-gray-400">No videos found.</div>
                    ) : (
                        <div className="divide-y divide-youtube-border/30">
                            {videos.map((video) => (
                                <div key={video.videoId} className="p-4 flex flex-col md:flex-row items-center gap-4 hover:bg-white/5 transition-colors">
                                    {/* Thumbnail Preview */}
                                    <div className="w-full md:w-32 aspect-video bg-black rounded-lg overflow-hidden shrink-0">
                                        <img
                                            src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Content */}
                                    {editingId === video.videoId ? (
                                        <div className="flex-1 w-full grid gap-2">
                                            <input
                                                className="bg-[#121212] border border-youtube-border rounded px-2 py-1 text-sm text-white"
                                                value={editForm.title}
                                                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                                placeholder="Video Title"
                                            />
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                ID: <input
                                                    className="bg-[#121212] border border-youtube-border rounded px-2 py-0.5 text-xs text-gray-400"
                                                    value={editForm.videoId}
                                                    onChange={(e) => setEditForm({ ...editForm, videoId: e.target.value })}
                                                    placeholder="Video ID"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex-1 w-full text-center md:text-left">
                                            <h3 className="font-bold text-base line-clamp-1">{video.title || '(No Title)'}</h3>
                                            <p className="text-xs text-gray-400 font-mono mt-1">{video.videoId}</p>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 shrink-0">
                                        {editingId === video.videoId ? (
                                            <>
                                                <button
                                                    onClick={handleUpdate}
                                                    disabled={processLoading}
                                                    className="p-2 text-green-400 hover:bg-green-400/10 rounded-full"
                                                >
                                                    <Save className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => setEditingId(null)}
                                                    className="p-2 text-gray-400 hover:bg-gray-400/10 rounded-full"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => startEdit(video)}
                                                    className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-full"
                                                >
                                                    <Edit2 className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(video.videoId)}
                                                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-full"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageVideos;
