import React from 'react';
import { Home, Compass, MonitorPlay, Clock, ThumbsUp, PlusSquare, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                ></div>
            )}

            {/* Sidebar Container */}
            <div className={`fixed top-0 left-0 bottom-0 w-[240px] bg-youtube-base z-50 transform transition-transform duration-200 border-r border-youtube-border/10 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="flex items-center gap-4 px-4 h-14 border-b border-youtube-border/10">
                    <button onClick={onClose} className="p-2 hover:bg-youtube-hover rounded-full transition-colors">
                        <X className="w-6 h-6 text-white" />
                    </button>
                    <Link to="/" className="flex items-center gap-1" onClick={onClose}>
                        <svg height="24" viewBox="0 0 24 24" width="24" focusable="false" className="text-red-600 fill-current">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                        </svg>
                        <span className="text-xl font-bold tracking-tighter text-white font-sans">YouTube</span>
                    </Link>
                </div>

                <div className="p-3">
                    <Link to="/" onClick={onClose} className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-youtube-hover transition-colors text-white">
                        <Home className="w-6 h-6" />
                        <span className="text-sm font-medium">Home</span>
                    </Link>
                    <div className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-youtube-hover transition-colors text-white cursor-pointer">
                        <Compass className="w-6 h-6" />
                        <span className="text-sm font-medium">Shorts</span>
                    </div>
                    <div className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-youtube-hover transition-colors text-white cursor-pointer">
                        <MonitorPlay className="w-6 h-6" />
                        <span className="text-sm font-medium">Subscriptions</span>
                    </div>

                    <div className="my-3 border-t border-youtube-border/10"></div>

                    <div className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-youtube-hover transition-colors text-white cursor-pointer">
                        <Clock className="w-6 h-6" />
                        <span className="text-sm font-medium">History</span>
                    </div>
                    <div className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-youtube-hover transition-colors text-white cursor-pointer">
                        <ThumbsUp className="w-6 h-6" />
                        <span className="text-sm font-medium">Liked videos</span>
                    </div>

                    <div className="my-3 border-t border-youtube-border/10"></div>

                    {/* The Magic Link */}
                    <Link to="/add-video" onClick={onClose} className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-youtube-hover transition-colors text-white">
                        <PlusSquare className="w-6 h-6 text-red-500" />
                        <span className="text-sm font-medium">Add Video (Admin)</span>
                    </Link>

                    <Link to="/manage-videos" onClick={onClose} className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-youtube-hover transition-colors text-white">
                        <div className="w-6 h-6 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
                        </div>
                        <span className="text-sm font-medium">Manage Videos</span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
