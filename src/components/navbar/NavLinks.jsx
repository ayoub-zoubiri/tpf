import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks = ({ scrolled, isHome }) => {
    return (
        <nav className="hidden md:flex items-center gap-6">
            <Link 
                to="/planner" 
                className={`text-sm font-medium transition ${
                    scrolled || !isHome ? 'text-slate-600 hover:text-slate-900' : 'text-white/80 hover:text-white'
                }`}
            >
                Plan Trip
            </Link>
            <Link 
                to="/blog" 
                className={`text-sm font-medium transition ${
                    scrolled || !isHome ? 'text-slate-600 hover:text-slate-900' : 'text-white/80 hover:text-white'
                }`}
            >
                Blog
            </Link>
        </nav>
    );
};

export default NavLinks;
