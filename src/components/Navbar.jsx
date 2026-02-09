import React from 'react';
import { Menu, Search, Bell, User, Mic, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ searchQuery, setSearchQuery, onSidebarToggle }) => {
    const [showMobileSearch, setShowMobileSearch] = React.useState(false);

    // Mobile Search Bar View
    if (showMobileSearch) {
        return (
            <nav className="sticky top-0 z-50 flex items-center gap-4 px-4 py-2 bg-youtube-base/95 backdrop-blur-sm border-b border-youtube-border/10">
                <button
                    onClick={() => setShowMobileSearch(false)}
                    className="p-2 hover:bg-youtube-hover rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-white" />
                </button>
                <div className="flex flex-1 items-center relative">
                    <div className="flex w-full rounded-full border border-youtube-border overflow-hidden focus-within:border-[#1c62b9] bg-[#121212]">
                        <div className="flex w-full items-center h-10 px-4">
                            <input
                                type="text"
                                placeholder="Search YouTube"
                                className="w-full bg-transparent outline-none text-white placeholder-youtube-textSecondary text-base"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </div>
                </div>
                <button className="p-2 bg-youtube-secondary hover:bg-youtube-hover rounded-full transition-colors">
                    <Mic className="w-5 h-5 text-white" />
                </button>
            </nav>
        )
    }

    // Default Navbar View
    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 bg-youtube-base/95 backdrop-blur-sm border-b border-youtube-border/10">
            <div className="flex items-center gap-4">
                <button
                    onClick={onSidebarToggle}
                    className="p-2 hover:bg-youtube-hover rounded-full transition-colors"
                >
                    <Menu className="w-6 h-6 text-white" />
                </button>
                <Link to="/" className="flex items-center gap-1 group">
                    <div className="flex items-center gap-1">
                        <svg height="24" viewBox="0 0 24 24" width="24" focusable="false" className="text-red-600 fill-current">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                        </svg>
                        <span className="text-xl font-bold tracking-tighter text-white font-sans hidden sm:block">YouTube</span>
                    </div>
                </Link>
            </div>

            <div className="hidden md:flex items-center gap-4 flex-1 max-w-[700px] mx-auto">
                <div className="flex flex-1 items-center relative">
                    <div className="flex w-full ml-8 rounded-full border border-youtube-border overflow-hidden focus-within:border-[#1c62b9] focus-within:ml-8">
                        <div className="flex w-full items-center bg-[#121212] h-10">
                            <div className="pl-4 w-full">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-full bg-transparent outline-none text-white placeholder-youtube-textSecondary text-base"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <button className="bg-youtube-secondary h-10 px-6 border-l border-youtube-border hover:bg-youtube-hover transition-colors flex items-center justify-center shrink-0">
                            <Search className="w-5 h-5 text-white font-light" strokeWidth={1} />
                        </button>
                    </div>
                </div>

                <button className="p-2 bg-youtube-secondary hover:bg-youtube-hover rounded-full transition-colors">
                    <Mic className="w-5 h-5 text-white" />
                </button>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => setShowMobileSearch(true)}
                    className="md:hidden p-2 hover:bg-youtube-hover rounded-full transition-colors"
                >
                    <Search className="w-6 h-6 text-white" />
                </button>
                <div className="hidden sm:block">
                    <button className="p-2 hover:bg-youtube-hover rounded-full transition-colors">
                        <Bell className="w-6 h-6 text-white" />
                    </button>
                </div>
                <button className="p-2 hover:bg-youtube-hover rounded-full transition-colors">
                    <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-sm font-bold">
                        M
                    </div>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
