import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import ItineraryView from '../../pages/ItineraryView';

const TripDetails = () => {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const response = await api.get(`/trips/${id}`);
                setTrip(response.data);
            } catch (err) {
                console.error("Error fetching trip details", err);
                setError("Failed to load trip details.");
            } finally {
                setLoading(false);
            }
        };

        fetchTrip();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center pt-16">
                    <div className="text-center">
                        <i className="fa-solid fa-spinner animate-spin text-blue-600 text-3xl mb-4"></i>
                        <p className="text-slate-500">Loading trip...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !trip) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Navbar />
                <main className="flex-grow flex flex-col items-center justify-center p-6 pt-16">
                    <div className="bg-white rounded-2xl p-12 text-center max-w-md">
                        <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <i className="fa-solid fa-triangle-exclamation text-xl"></i>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Trip Not Found</h2>
                        <p className="text-slate-500 mb-6">{error || "The trip you are looking for does not exist."}</p>
                        <Link to="/mytrips" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition">
                            <i className="fa-solid fa-arrow-left"></i> Back to My Trips
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <main className="flex-grow pt-20">
                <div className="w-full px-6 py-8 mx-auto">
                    {/* Back Link */}
                    <Link to="/mytrips" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium mb-6 transition">
                        <i className="fa-solid fa-arrow-left text-sm"></i> Back to My Trips
                    </Link>

                    {/* Trip Header */}
                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 md:p-8 text-white rounded-2xl mb-8">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold mb-2">{trip.trip_title}</h1>
                                <p className="text-slate-300 mb-4">{trip.summary}</p>
                                <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                                    <span className="flex items-center gap-2">
                                        <i className="fa-solid fa-location-dot text-blue-400"></i> {trip.destination}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <i className="fa-regular fa-calendar text-blue-400"></i> {trip.duration} Days
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <i className="fa-solid fa-wallet text-blue-400"></i> {trip.budget}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                    
                    <ItineraryView trip={trip} />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TripDetails;
