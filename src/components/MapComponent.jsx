import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to update map center when activities change
const MapUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, map.getZoom());
        }
    }, [center, map]);
    return null;
};

// Helper to get marker color based on time
const getMarkerColor = (time) => {
    const t = (time || '').toLowerCase();
    if (t.includes('morning')) return 'bg-orange-500 border-orange-200';
    if (t.includes('evening')) return 'bg-indigo-600 border-indigo-200';
    return 'bg-blue-500 border-blue-200'; // Afternoon/Default
};

const getMarkerIcon = (time, description) => {
    const colorClass = getMarkerColor(time);
    const iconClass = (time || '').toLowerCase().includes('morning') ? 'fa-sun' :
                     (time || '').toLowerCase().includes('evening') ? 'fa-moon' : 'fa-location-dot';
    
    return L.divIcon({
        className: 'custom-icon',
        html: `<div class="w-8 h-8 rounded-full ${colorClass} border-4 border-white shadow-lg flex items-center justify-center text-white text-xs">
                 <i class="fa-solid ${iconClass}"></i>
               </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
};

// Component to fit map bounds to markers
const MapBounds = ({ markers }) => {
    const map = useMap();
    useEffect(() => {
        if (markers.length > 0) {
            const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]));
            map.flyToBounds(bounds, { padding: [50, 50], maxZoom: 15 });
        }
    }, [markers, map]);
    return null;
};

const MapComponent = ({ activities, day }) => {
    // Default center (Paris)
    const defaultCenter = [48.8566, 2.3522];
    
    // Filter and process activities with Jitter to prevent overlap
    const processedActivities = activities
        .filter(a => a.latitude && a.longitude)
        .map((a, index) => {
             // Add a tiny deterministic jitter based on index
             // This separates markers that are at the exact same coordinates (e.g. 0.0003 is approx 30m)
             const jitter = 0.0003 * ((index % 3) - 1); 
             return {
                 ...a,
                 lat: parseFloat(a.latitude) + jitter,
                 lng: parseFloat(a.longitude) + jitter
             };
        });
    
    // Extract coordinates for the polyline
    const pathCoordinates = processedActivities.map(a => [a.lat, a.lng]);

    // Determine initial center (fallback)
    const center = processedActivities.length > 0 
        ? [processedActivities[0].lat, processedActivities[0].lng]
        : defaultCenter;

    return (
        <div className="h-full w-full rounded-2xl overflow-hidden shadow-sm border border-gray-100 z-0 relative">
             <MapContainer 
                center={center} 
                zoom={13} 
                style={{ height: '100%', width: '100%', minHeight: '400px' }}
                scrollWheelZoom={false}
            >
                {/* CartoDB Voyager */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                
                <MapBounds markers={processedActivities} />

                {/* Day Label */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm z-[1000] border border-gray-100">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Route</span>
                    <span className="text-lg font-black text-gray-900">Day {day}</span>
                </div>

                {/* Route Line */}
                {pathCoordinates.length > 1 && (
                    <Polyline 
                        positions={pathCoordinates} 
                        pathOptions={{ color: '#6366f1', weight: 4, opacity: 0.8, dashArray: '8, 8' }} 
                    />
                )}

                {processedActivities.map((activity, index) => (
                    <Marker 
                        key={index} 
                        position={[activity.lat, activity.lng]}
                        icon={getMarkerIcon(activity.time_of_day, activity.description)}
                    >
                        {/* Smaller, cleaner tooltip */}
                        <Tooltip direction="top" offset={[0, -36]} opacity={0.9} permanent className="!bg-white/90 !border-0 !text-[10px] !font-bold !text-gray-700 !px-2 !py-0.5 !rounded-md !shadow-sm">
                            {activity.location || activity.description.substring(0, 15)}
                        </Tooltip>
                        
                        <Popup>
                            <div className="font-sans">
                                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold text-white mb-2 ${getMarkerColor(activity.time_of_day)}`}>
                                    {activity.time_of_day}
                                </span>
                                <h3 className="font-bold text-sm mb-1">{activity.description}</h3>
                                <p className="text-xs text-blue-600 font-medium">{activity.location}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
