import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white border-b border-gray-100 py-4">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                     <img src="/logo.png" alt="Toplago" className="w-10 h-10 object-contain" />
                     <span className="text-xl font-bold text-gray-800">Toplago</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link to="/blog" className="text-sm font-medium text-gray-600 hover:text-gray-900 hidden md:block">Blog</Link>
                    {user ? (
                        <>
                            <span className="text-sm font-medium text-gray-600 hidden md:block">Hello, {user.name}</span>
                            {user.role === 'admin' && (
                                <Link to="/admin" className="text-sm font-medium text-purple-600 hover:text-purple-700">Admin Dashboard</Link>
                            )}
                            <button onClick={logout} className="text-sm font-medium text-gray-600 hover:text-gray-900">Sign Out</button>
                            <Link to="/mytrips" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition">My Trips</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">Sign In</Link>
                            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition">Get Started</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
