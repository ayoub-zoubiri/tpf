import React from 'react';
import { Link } from 'react-router-dom';

const NavLogo = ({ scrolled, isHome }) => {
    return (
        <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Toplago" className="w-8 h-8 object-contain" />
            <span className={`text-lg font-semibold ${scrolled || !isHome ? 'text-slate-900' : 'text-white'}`}>
                Toplago
            </span>
        </Link>
    );
};

export default NavLogo;
