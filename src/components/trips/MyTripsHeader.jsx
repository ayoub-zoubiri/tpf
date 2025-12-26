import React from 'react';
import { Link } from 'react-router-dom';

const MyTripsHeader = ({ tripCount }) => {
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">My Trips</h1>
                <p className="text-slate-500 text-sm">
                    {tripCount} {tripCount === 1 ? 'trip' : 'trips'} saved
                </p>
            </div>
            <Link 
                to="/planner" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
            >
                <i className="fa-solid fa-plus"></i>
                New Trip
            </Link>
        </div>
    );
};

export default MyTripsHeader;
