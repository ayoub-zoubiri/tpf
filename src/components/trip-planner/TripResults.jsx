import React from 'react';
import { Link } from 'react-router-dom';
import ItineraryView from '../../pages/ItineraryView';

const TripResults = ({ result, onReset }) => {
    return (
        <div className="w-full">
            {/* Trip Header Card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">{result.trip_title}</h2>
                        <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                                <i className="fa-solid fa-location-dot"></i> {result.destination}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">
                                <i className="fa-regular fa-calendar"></i> {result.duration} days
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
                                <i className="fa-solid fa-wallet"></i> {result.budget}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {result.id && (
                            <Link to={`/trips/${result.id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition flex items-center gap-2">
                                <i className="fa-solid fa-eye"></i> View Full Trip
                            </Link>
                        )}
                        <button onClick={onReset} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-medium transition flex items-center gap-2">
                            <i className="fa-solid fa-plus"></i> New Trip
                        </button>
                    </div>
                </div>
            </div>
            
            <ItineraryView trip={result} />
        </div>
    );
};

export default TripResults;
