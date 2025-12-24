import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
    const { user, logout, loading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <i className="fa-solid fa-spinner animate-spin text-blue-600 text-3xl"></i>
            </div>
        );
    }

    if (!user || user.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/admin/dashboard', icon: 'fa-chart-line', label: 'Dashboard' },
        { path: '/admin/users', icon: 'fa-users', label: 'Users' },
        { path: '/admin/trips', icon: 'fa-map-location-dot', label: 'Trips' },
        { path: '/admin/blogs', icon: 'fa-newspaper', label: 'Blogs' },
    ];

    const getPageTitle = () => {
        if (location.pathname.includes('dashboard')) return 'Dashboard';
        if (location.pathname.includes('users')) return 'Users';
        if (location.pathname.includes('trips')) return 'Trips';
        if (location.pathname.includes('blogs')) return 'Blogs';
        return 'Admin';
    };

    return (
        <div className="flex h-screen bg-slate-100">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 transition-transform duration-200`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-5 border-b border-slate-800">
                        <Link to="/" className="flex items-center gap-2">
                            <img src="/logo.png" alt="Toplago" className="w-8 h-8 object-contain"/>
                            <span className="text-lg font-bold text-white">Toplago</span>
                        </Link>
                        <p className="text-xs text-slate-500 mt-1">Admin Panel</p>
                    </div>

                    {/* Nav */}
                    <nav className="flex-grow p-4 space-y-1">
                        {navItems.map(item => (
                            <Link 
                                key={item.path}
                                to={item.path} 
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                                    isActive(item.path) 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                            >
                                <i className={`fa-solid ${item.icon} w-5`}></i>
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-slate-800">
                        <Link 
                            to="/" 
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition"
                        >
                            <i className="fa-solid fa-arrow-left w-5"></i>
                            Back to Site
                        </Link>
                        <button 
                            onClick={handleLogout} 
                            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm text-slate-400 hover:bg-red-600 hover:text-white transition"
                        >
                            <i className="fa-solid fa-right-from-bracket w-5"></i>
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden" 
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Main */}
            <div className="flex-grow flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button 
                            className="md:hidden text-slate-600"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <i className="fa-solid fa-bars text-lg"></i>
                        </button>
                        <h1 className="text-lg font-bold text-slate-900">{getPageTitle()}</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {user?.name?.charAt(0).toUpperCase() || 'A'}
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-grow overflow-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
