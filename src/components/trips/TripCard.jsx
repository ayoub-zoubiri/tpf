import React from 'react';
import { Link } from 'react-router-dom';

const TripCard = ({ trip, formatDate }) => {
    return (
        <Link 
            to={`/trips/${trip.id}`}
            className="block bg-white rounded-xl p-4 border border-slate-100 hover:border-blue-200 hover:shadow-md transition group"
        >
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 transition">
                    <i className="fa-solid fa-location-dot text-slate-500 group-hover:text-blue-600 transition"></i>
                </div>
                <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-900">{trip.destination}</h3>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                            {trip.duration}d
                        </span>
                    </div>
                    <p className="text-slate-500 text-sm truncate">{trip.trip_title}</p>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="text-xs text-slate-400">{formatDate(trip.created_at)}</span>
                    <i className="fa-solid fa-chevron-right text-slate-300 group-hover:text-blue-600 transition"></i>
                </div>
            </div>
        </Link>
    );
};

export default TripCard;
