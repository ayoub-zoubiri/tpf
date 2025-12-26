import React from 'react';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import { getMarkerColor, getTimeIcon, createMarkerIcon } from './MapHelpers';

const MapMarkers = ({ activities }) => {
    return (
        <>
            {activities.map((activity) => (
                <Marker 
                    key={activity.number} 
                    position={[activity.lat, activity.lng]}
                    icon={createMarkerIcon(activity.time_of_day || activity.time, activity.number)}
                >
                    <Tooltip 
                        direction="top" 
                        offset={[0, -35]} 
                        permanent
                        className="!bg-slate-800 !text-white !border-0 !text-[10px] !font-semibold !px-2 !py-1 !rounded-md !shadow-lg"
                    >
                        {getTimeIcon(activity.time_of_day || activity.time)} {(activity.time_of_day || activity.time || '').split(' ')[0]}
                    </Tooltip>
                    
                    <Popup>
                        <div className="font-sans min-w-[200px] max-w-[260px]">
                            <div 
                                className="text-xs font-bold text-white px-2 py-1 rounded mb-2 inline-block"
                                style={{ backgroundColor: getMarkerColor(activity.time_of_day || activity.time) }}
                            >
                                {activity.time_of_day || activity.time}
                            </div>
                            <h3 className="font-bold text-sm text-slate-900 mb-2 leading-snug">
                                {activity.description}
                            </h3>
                            {activity.location && (
                                <p className="text-xs text-slate-600 flex items-start gap-1.5">
                                    <i className="fa-solid fa-location-dot text-blue-500 mt-0.5"></i>
                                    <span>{activity.location}</span>
                                </p>
                            )}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    );
};

export default MapMarkers;
