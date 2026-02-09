import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Watch from './pages/Watch';

import AddVideo from './pages/AddVideo';
import ManageVideos from './pages/ManageVideos';
import Sidebar from './components/Sidebar';

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-youtube-base text-youtube-text">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <Navbar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
                />
                <div className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home searchQuery={searchQuery} />} />
                        <Route path="/watch/:videoId" element={<Watch />} />
                        <Route path="/add-video" element={<AddVideo />} />
                        <Route path="/manage-videos" element={<ManageVideos />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
