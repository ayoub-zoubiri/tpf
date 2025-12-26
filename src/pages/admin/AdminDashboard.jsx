import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import StatCard from '../../components/admin/StatCard';
import RecentUsers from '../../components/admin/RecentUsers';
import PopularDestinations from '../../components/admin/PopularDestinations';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ users_count: 0, trips_count: 0, blogs_count: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/admin/stats');
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <i className="fa-solid fa-spinner animate-spin text-blue-600 text-2xl"></i>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard 
                    label="Users" 
                    value={stats.users_count} 
                    icon="fa-solid fa-users" 
                    bgClass="bg-blue-50" 
                    colorClass="text-blue-600" 
                />
                <StatCard 
                    label="Trips" 
                    value={stats.trips_count} 
                    icon="fa-solid fa-map-location-dot" 
                    bgClass="bg-green-50" 
                    colorClass="text-green-600" 
                />
                <StatCard 
                    label="Blog Posts" 
                    value={stats.blogs_count} 
                    icon="fa-solid fa-newspaper" 
                    bgClass="bg-purple-50" 
                    colorClass="text-purple-600" 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentUsers users={stats.recent_users} />
                <PopularDestinations destinations={stats.popular_destinations} />
            </div>
        </div>
    );
};

export default AdminDashboard;
