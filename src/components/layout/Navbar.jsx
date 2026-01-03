import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const isHome = location.pathname === '/';
    const isDark = !scrolled && isHome;

    // Handle scroll effect
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => setMobileOpen(false), [location]);

    // Dynamic text color based on scroll/page
    const textStyle = isDark ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-slate-900';

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${isDark ? 'bg-transparent' : 'bg-white shadow-sm'}`}>
            <div className="container mx-auto px-6">
                <div className="h-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="Toplago" className="w-8 h-8 object-contain" />
                        <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Toplago</span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/planner" className={`text-sm font-medium transition ${textStyle}`}>Plan Trip</Link>
                        <Link to="/blog" className={`text-sm font-medium transition ${textStyle}`}>Blog</Link>
                    </nav>

                    {/* Desktop User Menu */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className={`text-sm font-medium transition ${textStyle}`}>Admin</Link>
                                )}
                                <Link to="/mytrips" className={`text-sm font-medium transition ${textStyle}`}>My Trips</Link>
                                <div className={`w-px h-4 ${isDark ? 'bg-white/30' : 'bg-slate-200'}`}></div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <button onClick={logout} className={`text-sm transition ${isDark ? 'text-white/70 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
                                        Sign out
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className={`text-sm font-medium transition ${textStyle}`}>Sign in</Link>
                                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setMobileOpen(!mobileOpen)} className={`md:hidden p-2 ${isDark ? 'text-white' : 'text-slate-600'}`}>
                        <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
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
            )}
        </header>
    );
};

export default Navbar;
