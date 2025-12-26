import React from 'react';
import MapComponent from '../MapComponent';

const MapSection = ({ activeDay, activities, destination }) => {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden sticky top-24">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wide">Route</span>
                    <h3 className="font-semibold text-slate-900">Day {activeDay}</h3>
                </div>
                <div className="flex gap-2">
                    <button className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center text-slate-600 transition">
                        <i className="fa-solid fa-minus text-xs"></i>
                    </button>
                    <button className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center text-slate-600 transition">
                        <i className="fa-solid fa-plus text-xs"></i>
                    </button>
                </div>
            </div>
            <div className="h-[400px] lg:h-[500px]">
                <MapComponent activities={activities} day={activeDay} destination={destination} />
            </div>
        </div>
    );
};

export default MapSection;
