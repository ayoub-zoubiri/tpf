import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-100 py-8">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Brand */}
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-slate-900">Toplago</span>
                    <span className="text-slate-400 text-sm">© 2025</span>
                </div>

                {/* Simple Links */}
                <div className="flex gap-6 text-sm text-slate-500">
                    <Link to="/privacy" className="hover:text-slate-900 transition">Privacy</Link>
                    <Link to="/terms" className="hover:text-slate-900 transition">Terms</Link>
                    <a href="mailto:contact@toplago.com" className="hover:text-slate-900 transition">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
