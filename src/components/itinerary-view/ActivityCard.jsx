import React from 'react';

const ActivityCard = ({ activity }) => {
    const getTimeIcon = (time) => {
        const t = (time || '').toLowerCase();
        if (t.includes('morning')) return { icon: 'fa-sun', bg: 'bg-amber-500' };
        if (t.includes('afternoon')) return { icon: 'fa-cloud-sun', bg: 'bg-orange-500' };
        if (t.includes('evening') || t.includes('night')) return { icon: 'fa-moon', bg: 'bg-indigo-500' };
        if (t.includes('lunch')) return { icon: 'fa-utensils', bg: 'bg-red-500' };
        return { icon: 'fa-location-dot', bg: 'bg-blue-500' };
    };

    const timeInfo = getTimeIcon(activity.time_of_day || activity.time);

    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-lg hover:border-blue-100 transition-all group">
            <div className="flex gap-4">
                {/* Time Icon */}
                <div className={`w-10 h-10 ${timeInfo.bg} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                    <i className={`fa-solid ${timeInfo.icon} text-sm`}></i>
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                            {activity.time_of_day || activity.time}
                        </span>
                        <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-blue-600 transition">
                            <i className="fa-solid fa-ellipsis"></i>
                        </button>
                    </div>
                    
                    <h3 className="font-semibold text-slate-900 text-sm mb-1.5 leading-snug">
                        {activity.description}
                    </h3>
                    
                    {activity.location && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                            <i className="fa-solid fa-location-dot text-slate-400 text-[10px]"></i>
                            <span className="truncate">{activity.location}</span>
                        </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex gap-3 pt-2 border-t border-slate-50">
                        <button className="text-[10px] uppercase font-medium text-slate-400 hover:text-blue-600 flex items-center gap-1 transition">
                            <i className="fa-solid fa-directions"></i> Directions
                        </button>
                        <button className="text-[10px] uppercase font-medium text-slate-400 hover:text-blue-600 flex items-center gap-1 transition">
                            <i className="fa-solid fa-bookmark"></i> Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityCard;
