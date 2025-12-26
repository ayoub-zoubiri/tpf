import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import MyTripsHeader from '../components/trips/MyTripsHeader';
import EmptyTripsState from '../components/trips/EmptyTripsState';
import TripCard from '../components/trips/TripCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MyTrips = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await api.get('/trips');
                setTrips(response.data);
            } catch (error) {
                console.error("Error fetching trips", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <main className="flex-grow pt-20">
                <div className="container mx-auto px-6 py-8 max-w-4xl">
                    <MyTripsHeader tripCount={trips.length} />

                    {loading ? (
                        <div className="bg-white rounded-2xl p-12 text-center">
                            <i className="fa-solid fa-spinner animate-spin text-blue-600 text-2xl mb-4"></i>
                            <p className="text-slate-500">Loading trips...</p>
                        </div>
                    ) : trips.length === 0 ? (
                        <EmptyTripsState />
                    ) : (
                        <div className="space-y-3">
                            {trips.map((trip) => (
                                <TripCard key={trip.id} trip={trip} formatDate={formatDate} />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default MyTrips;
