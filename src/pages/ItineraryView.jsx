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
                    

                </div>
            </div>
        </div>
    );
};

export default ItineraryView;

