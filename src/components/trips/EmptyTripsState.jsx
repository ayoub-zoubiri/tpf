import React from 'react';
import { Link } from 'react-router-dom';

const EmptyTripsState = () => {
    return (
        <div className="bg-white rounded-2xl p-12 text-center">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-map text-blue-600 text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No trips yet</h3>
            <p className="text-slate-500 text-sm mb-6">Create your first AI-powered itinerary</p>
            <Link 
                to="/planner" 
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
            >
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                Create Trip
            </Link>
        </div>
    );
};

export default EmptyTripsState;
