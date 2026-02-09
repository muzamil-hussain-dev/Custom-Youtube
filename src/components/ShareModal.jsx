import React, { useState, useEffect } from 'react';
import { X, Copy, Check } from 'lucide-react';
import {
    FaWhatsapp,
    FaFacebook,
    FaTwitter,
    FaReddit,
    FaEnvelope,
    FaTelegram,
    FaLinkedin
} from 'react-icons/fa';

const ShareModal = ({ isOpen, onClose, video }) => {
    const [copied, setCopied] = useState(false);
    const [url, setUrl] = useState('');

    useEffect(() => {
        if (isOpen) {
            setUrl(window.location.href);
            setCopied(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const shareOptions = [
        { name: 'WhatsApp', icon: FaWhatsapp, color: '#25D366' },
        { name: 'Facebook', icon: FaFacebook, color: '#1877F2' },
        { name: 'X', icon: FaTwitter, color: '#000000' },
        { name: 'Reddit', icon: FaReddit, color: '#FF4500' },
        { name: 'Email', icon: FaEnvelope, color: '#EA4335' },
        { name: 'Telegram', icon: FaTelegram, color: '#0088cc' },
        { name: 'LinkedIn', icon: FaLinkedin, color: '#0A66C2' },
    ];

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative bg-[#212121] text-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <h2 className="text-lg font-bold">Share</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-4">
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {shareOptions.map((option) => (
                            <button
                                key={option.name}
                                className="flex flex-col items-center gap-2 min-w-[70px] group"
                            >
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl transition-transform group-hover:scale-110"
                                    style={{ backgroundColor: option.color === '#000000' ? '#333' : option.color }}
                                >
                                    <option.icon />
                                </div>
                                <span className="text-xs text-youtube-textSecondary group-hover:text-white transition-colors">
                                    {option.name}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-4 flex items-center gap-2 bg-[#181818] border border-white/10 rounded-lg p-2 pl-3">
                        <input
                            type="text"
                            readOnly
                            value={url}
                            className="bg-transparent text-sm text-youtube-textSecondary w-full outline-none"
                        />
                        <button
                            onClick={handleCopy}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-full transition-colors flex items-center gap-2 ml-2"
                        >
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
