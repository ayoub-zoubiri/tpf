import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = ({ isOpen, navItems, currentPath, onClose, onLogout }) => {
    const isActive = (path) => currentPath === path;

    return (
        <>
            {/* Sidebar */}
            <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 transition-transform duration-200`}>
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
                                onClick={onClose}
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
                            onClick={onLogout} 
                            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm text-slate-400 hover:bg-red-600 hover:text-white transition"
                        >
                            <i className="fa-solid fa-right-from-bracket w-5"></i>
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden" 
                    onClick={onClose}
                ></div>
            )}
        </>
    );
};

export default AdminSidebar;
