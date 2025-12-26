import React from 'react';
import { Link } from 'react-router-dom';

const UserMenu = ({ user, logout, scrolled, isHome }) => {
    return (
        <div className="hidden md:flex items-center gap-3">
            {user ? (
                <>
                    {user.role === 'admin' && (
                        <Link 
                            to="/admin" 
                            className={`text-sm font-medium transition ${
                                scrolled || !isHome ? 'text-slate-600 hover:text-slate-900' : 'text-white/80 hover:text-white'
                            }`}
                        >
                            Admin
                        </Link>
                    )}
                    <Link 
                        to="/mytrips" 
                        className={`text-sm font-medium transition ${
                            scrolled || !isHome ? 'text-slate-600 hover:text-slate-900' : 'text-white/80 hover:text-white'
                        }`}
                    >
                        My Trips
                    </Link>
                    <div className={`w-px h-4 ${scrolled || !isHome ? 'bg-slate-200' : 'bg-white/30'}`}></div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <button 
                            onClick={logout}
                            className={`text-sm transition ${
                                scrolled || !isHome ? 'text-slate-500 hover:text-slate-900' : 'text-white/70 hover:text-white'
                            }`}
                        >
                            Sign out
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <Link 
                        to="/login" 
                        className={`text-sm font-medium transition ${
                            scrolled || !isHome ? 'text-slate-600 hover:text-slate-900' : 'text-white/80 hover:text-white'
                        }`}
                    >
                        Sign in
                    </Link>
                    <Link 
                        to="/register" 
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                    >
                        Get Started
                    </Link>
                </>
            )}
        </div>
    );
};

export default UserMenu;
