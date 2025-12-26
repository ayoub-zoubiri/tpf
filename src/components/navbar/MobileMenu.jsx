import React from 'react';
import { Link } from 'react-router-dom';

const MobileMenu = ({ isOpen, user, logout }) => {
    if (!isOpen) return null;

    return (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
            <nav className="container mx-auto px-6 py-4 space-y-2">
                <Link to="/planner" className="block py-2 text-slate-700 font-medium">Plan Trip</Link>
                <Link to="/blog" className="block py-2 text-slate-700 font-medium">Blog</Link>
                <hr className="my-2 border-slate-100" />
                {user ? (
                    <>
                        <Link to="/mytrips" className="block py-2 text-slate-700 font-medium">My Trips</Link>
                        {user.role === 'admin' && (
                            <Link to="/admin" className="block py-2 text-slate-700 font-medium">Admin</Link>
                        )}
                        <button onClick={logout} className="block py-2 text-slate-500">Sign out</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="block py-2 text-slate-700 font-medium">Sign in</Link>
                        <Link to="/register" className="block mt-2 bg-blue-600 text-white text-center py-3 rounded-xl font-medium">
                            Get Started
                        </Link>
                    </>
                )}
            </nav>
        </div>
    );
};

export default MobileMenu;
