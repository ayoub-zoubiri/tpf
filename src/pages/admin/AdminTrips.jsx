import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import TripsTable from '../../components/admin/trips/TripsTable';
import TripModal from '../../components/admin/trips/TripModal';

const AdminTrips = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [formData, setFormData] = useState({ trip_title: '', destination: '', duration: 1 });

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        try {
            const response = await api.get('/admin/trips');
            setTrips(response.data);
        } catch (error) {
            console.error("Error fetching trips", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this trip?')) {
            try {
                await api.delete(`/admin/trips/${id}`);
                setTrips(trips.filter(trip => trip.id !== id));
            } catch (error) {
                console.error("Error deleting trip", error);
            }
        }
    };

    const handleEditClick = (trip) => {
        setSelectedTrip(trip);
        setFormData({ trip_title: trip.trip_title, destination: trip.destination, duration: trip.duration });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put(`/admin/trips/${selectedTrip.id}`, formData);
            setTrips(trips.map(t => t.id === selectedTrip.id ? { ...t, ...response.data } : t));
            setShowModal(false);
        } catch (error) {
            console.error("Error updating trip", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <i className="fa-solid fa-spinner animate-spin text-blue-600 text-2xl"></i>
            </div>
        );
    }

    return (
        <div>
            <TripsTable 
                trips={trips} 
                onEdit={handleEditClick} 
                onDelete={handleDelete} 
            />

            <TripModal 
                isOpen={showModal} 
                onClose={() => setShowModal(false)}
                formData={formData}
                onSubmit={handleSubmit}
                onChange={handleChange}
            />
        </div>
    );
};

export default AdminTrips;
