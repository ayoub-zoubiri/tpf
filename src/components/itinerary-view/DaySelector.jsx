import React from 'react';

const DaySelector = ({ days, activeDay, onDaySelect }) => {
    return (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {days.map((day) => {
                const dayNum = day.day_number || day.day;
                return (
                    <button
                        key={dayNum}
                        onClick={() => onDaySelect(dayNum)}
                        className={`flex-shrink-0 px-5 py-3 rounded-xl font-medium transition ${
                            activeDay === dayNum
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
                        }`}
                    >
                        <span className="text-xs opacity-70">Day</span>
                        <span className="block text-lg">{dayNum}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default DaySelector;
