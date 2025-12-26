import React from 'react';

const AdminHeader = ({ title, user, onToggleSidebar }) => {
    return (
        <header className="bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <button 
                    className="md:hidden text-slate-600"
                    onClick={onToggleSidebar}
                >
                    <i className="fa-solid fa-bars text-lg"></i>
                </button>
                <h1 className="text-lg font-bold text-slate-900">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user?.name?.charAt(0).toUpperCase() || 'A'}
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
