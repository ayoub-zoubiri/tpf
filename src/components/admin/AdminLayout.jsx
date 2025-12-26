import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Sub-components
import LoadingScreen from './layout/LoadingScreen';
import AdminSidebar from './layout/AdminSidebar';
import AdminHeader from './layout/AdminHeader';

const AdminLayout = () => {
    const { user, logout, loading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (loading) {
        return <LoadingScreen />;
    }

    if (!user || user.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

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
            <AdminSidebar 
                isOpen={sidebarOpen} 
                navItems={navItems} 
                currentPath={location.pathname} 
                onClose={() => setSidebarOpen(false)} 
                onLogout={handleLogout} 
            />

            {/* Main */}
            <div className="flex-grow flex flex-col overflow-hidden">
                <AdminHeader 
                    title={getPageTitle()} 
                    user={user} 
                    onToggleSidebar={() => setSidebarOpen(true)} 
                />

                {/* Content */}
                <main className="flex-grow overflow-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;

