import React, { useState } from 'react';

// Sub-components
import MapSection from '../components/itinerary-view/MapSection';
import DaySelector from '../components/itinerary-view/DaySelector';
import ActivityCard from '../components/itinerary-view/ActivityCard';

const ItineraryView = ({ trip }) => {
    const [activeDay, setActiveDay] = useState(1);
    const days = trip.day_plans || trip.days || [];
    const currentDayActivities = days.find(d => (d.day_number || d.day) === activeDay)?.activities || [];

    return (
        <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column: Map */}
            <div className="order-2 lg:order-1">
                <MapSection 
                    activeDay={activeDay} 
                    activities={currentDayActivities} 
                    destination={trip.destination} 
                />
            </div>

            {/* Right Column: Itinerary */}
            <div className="order-1 lg:order-2">
                {/* Day Selector */}
                <DaySelector 
                    days={days} 
                    activeDay={activeDay} 
                    onDaySelect={setActiveDay} 
                />

                {/* Activities */}
                <div className="space-y-4">
                    {currentDayActivities.map((activity, index) => (
                        <ActivityCard key={index} activity={activity} />
                    ))}
                    
                    {/* Add Activity */}
                    <button className="w-full py-4 bg-white border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-medium hover:border-blue-400 hover:text-blue-600 transition flex items-center justify-center gap-2">
                        <i className="fa-solid fa-plus"></i> Add Activity
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItineraryView;

