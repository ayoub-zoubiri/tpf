import React, { useState } from 'react';
import MapComponent from './MapComponent';

const ItineraryView = ({ trip }) => {
    const [activeDay, setActiveDay] = useState(1);
    const days = trip.day_plans || trip.days || [];

    // Helper to get activities for the current day
    const currentDayActivities = days.find(d => (d.day_number || d.day) === activeDay)?.activities || [];

    // Mock data for recommendations (Right column)
    const recommendations = [
        {
            id: 1,
            title: "Skip-the-Line Louvre Museum Guided Tour",
            image: "https://images.unsplash.com/photo-1499856871940-a09627c6dcf6?q=80&w=1000&auto=format&fit=crop",
            rating: 4.9,
            reviews: 12847,
            duration: "3 hours",
            price: 89,
            tags: ["Small group", "English, French"]
        },
        {
            id: 2,
            title: "Eiffel Tower Summit with Priority Access",
            image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce7859?q=80&w=1000&auto=format&fit=crop",
            rating: 4.7,
            reviews: 28394,
            duration: "1.5 hours",
            price: 72,
            tags: ["Skip-the-line", "Accessible"]
        },
        {
            id: 3,
            title: "Seine River Dinner Cruise with Live Music",
            image: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?q=80&w=1000&auto=format&fit=crop",
            rating: 4.8,
            reviews: 9156,
            duration: "2.5 hours",
            price: 145,
            tags: ["Dinner included", "Live music"]
        }
    ];

    return (
        <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Column: Itinerary */}
            <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Day-by-Day Itinerary</h2>
                        <button className="text-blue-600 hover:text-blue-700">
                            <i className="fa-solid fa-pen"></i>
                        </button>
                    </div>

                    {/* Day Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
                        {days.map((day) => {
                            const dayNum = day.day_number || day.day;
                            return (
                                <button
                                    key={dayNum}
                                    onClick={() => setActiveDay(dayNum)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                                        activeDay === dayNum
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    Day {dayNum}
                                </button>
                            );
                        })}
                    </div>

                    {/* Timeline */}
                    <div className="relative pl-4 border-l-2 border-gray-100 space-y-8">
                        {currentDayActivities.map((activity, index) => (
                            <div key={index} className="relative pl-6">
                                {/* Timeline Dot/Icon */}
                                <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-blue-500 border-4 border-white shadow-sm flex items-center justify-center text-white text-sm z-10">
                                    <i className={`fa-solid ${
                                        (activity.time_of_day || activity.time || '').toLowerCase().includes('morning') ? 'fa-sun' :
                                        (activity.time_of_day || activity.time || '').toLowerCase().includes('evening') ? 'fa-moon' :
                                        (activity.time_of_day || activity.time || '').toLowerCase().includes('lunch') ? 'fa-utensils' :
                                        'fa-location-dot'
                                    }`}></i>
                                </div>

                                {/* Content */}
                                <div>
                                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1 block">
                                        {activity.time_of_day || activity.time}
                                    </span>
                                    <h3 className="text-base font-bold text-gray-900 mb-1">{activity.description}</h3>
                                    <p className="text-sm text-gray-500 mb-2">{activity.location}</p>
                                    {/* Optional: Add tags or more details if available */}
                                </div>
                            </div>
                        ))}
                        
                        {/* Add Activity Button Placeholder */}
                        <div className="relative pl-6 pt-4">
                            <div className="absolute -left-[11px] top-6 w-5 h-5 rounded-full bg-gray-200 border-2 border-white"></div>
                            <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm font-medium hover:border-blue-300 hover:text-blue-500 transition">
                                Add Activity
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Map */}
            <div className="lg:col-span-7 space-y-6 h-[600px] sticky top-8">
                <MapComponent activities={currentDayActivities} day={activeDay} />
            </div>
        </div>
    );
};

export default ItineraryView;
