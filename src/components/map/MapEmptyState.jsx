import React from 'react';

const MapEmptyState = () => {
    return (
        <div className="h-full w-full flex items-center justify-center bg-slate-100 rounded-xl">
            <div className="text-center p-6">
                <i className="fa-solid fa-map-location-dot text-slate-300 text-4xl mb-3"></i>
                <p className="text-slate-500 font-medium">No location data available</p>
                <p className="text-slate-400 text-sm">Locations will appear when coordinates are available</p>
            </div>
        </div>
    );
};

export default MapEmptyState;
