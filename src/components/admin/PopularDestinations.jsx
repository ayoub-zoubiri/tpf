import React from 'react';

const PopularDestinations = ({ destinations }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h3 className="font-bold text-slate-900 mb-4">Popular Destinations</h3>
            {destinations && destinations.length > 0 ? (
                <div className="space-y-3">
                    {destinations.map((dest, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">
                                    {index + 1}
                                </div>
                                <span className="font-medium text-slate-800 text-sm">{dest.destination}</span>
                            </div>
                            <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-lg text-xs font-medium">
                                {dest.count} trips
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-slate-400 text-sm text-center py-4">No trip data yet</p>
            )}
        </div>
    );
};

export default PopularDestinations;
