import React from 'react';

const LoadingState = ({ destination }) => {
    return (
        <div className="bg-white rounded-2xl p-12 text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <img src="/logo.png" alt="Toplago" className="w-12 h-12 object-contain"/>
                </div>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Crafting your itinerary...</h2>
            <p className="text-slate-500">AI is building the perfect trip to {destination}</p>
        </div>
    );
};

export default LoadingState;
