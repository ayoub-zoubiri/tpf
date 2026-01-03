import React, { useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// === HELPER FUNCTIONS ===

// Get marker color based on time of day
const getMarkerColor = (time) => {
    const t = (time || '').toLowerCase();
    if (t.includes('morning')) return '#f59e0b';
    if (t.includes('afternoon')) return '#f97316';
    if (t.includes('evening') || t.includes('night')) return '#6366f1';
    if (t.includes('lunch')) return '#ef4444';
    return '#3b82f6';
};

// Get emoji icon for time of day
const getTimeIcon = (time) => {
    const t = (time || '').toLowerCase();
    if (t.includes('morning')) return '☀️';
    if (t.includes('afternoon')) return '🌤️';
    if (t.includes('evening') || t.includes('night')) return '🌙';
    return '📍';
};

// Create custom numbered marker
const createMarkerIcon = (time, number) => {
    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="
            width: 32px; height: 32px;
            background: ${getMarkerColor(time)};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex; align-items: center; justify-content: center;
            color: white; font-weight: bold; font-size: 13px; font-family: system-ui, sans-serif;
        ">${number}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
};

// === MAP EFFECTS (must be inside MapContainer) ===

// Fit map bounds to markers
const MapBounds = ({ markers }) => {
    const map = useMap();
    useEffect(() => {
        if (markers.length > 0) {
            const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]));
            map.flyToBounds(bounds, { padding: [50, 50], maxZoom: 14, duration: 0.5 });
        }
    }, [markers, map]);
    return null;
};

// Fix map size on resize/layout changes
const MapResizer = () => {
    const map = useMap();
    useEffect(() => {
        map.invalidateSize();
        const timer = setTimeout(() => map.invalidateSize(), 400);
        const handleResize = () => map.invalidateSize();
        window.addEventListener('resize', handleResize);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, [map]);
    return null;
};

// === MAIN COMPONENT ===

const MapComponent = ({ activities }) => {
    // Process activities with valid coordinates
    const processedActivities = useMemo(() => {
        if (!activities?.length) return [];
        
        return activities
            .map((activity, index) => {
                const lat = parseFloat(activity.latitude);
                const lng = parseFloat(activity.longitude);
                
                if (isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) return null;
                
                // Small offset to prevent overlapping markers
                const angle = (index / activities.length) * 2 * Math.PI;
                const offset = 0.0003 * index;
                
                return {
                    ...activity,
                    lat: lat + Math.sin(angle) * offset,
                    lng: lng + Math.cos(angle) * offset,
                    number: index + 1
                };
            })
            .filter(Boolean);
    }, [activities]);

    // Calculate map center
    const center = useMemo(() => {
        if (processedActivities.length > 0) {
            const avgLat = processedActivities.reduce((sum, a) => sum + a.lat, 0) / processedActivities.length;
            const avgLng = processedActivities.reduce((sum, a) => sum + a.lng, 0) / processedActivities.length;
            return [avgLat, avgLng];
        }
        return [33.5731, -7.5898]; // Default: Casablanca
    }, [processedActivities]);

    // Route line coordinates
    const pathCoordinates = processedActivities.map(a => [a.lat, a.lng]);

    // Empty state - no valid coordinates
    if (processedActivities.length === 0) {
        return (
            <div className="h-full w-full flex items-center justify-center bg-slate-100 rounded-xl">
                <div className="text-center p-6">
                    <i className="fa-solid fa-map-location-dot text-slate-300 text-4xl mb-3"></i>
                    <p className="text-slate-500 font-medium">No location data available</p>
                    <p className="text-slate-400 text-sm">Locations will appear when coordinates are available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full relative">
            <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                
                <MapResizer />
                <MapBounds markers={processedActivities} />

                {/* Route line */}
                {pathCoordinates.length > 1 && (
                    <Polyline 
                        positions={pathCoordinates} 
                        pathOptions={{ color: '#3b82f6', weight: 3, opacity: 0.6, dashArray: '8, 6' }} 
                    />
                )}

                {/* Activity markers */}
                {processedActivities.map((activity) => {
                    const time = activity.time_of_day || activity.time;
                    return (
                        <Marker 
                            key={activity.number} 
                            position={[activity.lat, activity.lng]}
                            icon={createMarkerIcon(time, activity.number)}
                        >
                            <Tooltip 
                                direction="top" 
                                offset={[0, -35]} 
                                permanent
                                className="!bg-slate-800 !text-white !border-0 !text-[10px] !font-semibold !px-2 !py-1 !rounded-md !shadow-lg"
                            >
                                {getTimeIcon(time)} {(time || '').split(' ')[0]}
                            </Tooltip>
                            
                            <Popup>
                                <div className="font-sans min-w-[200px] max-w-[260px]">
                                    <div 
                                        className="text-xs font-bold text-white px-2 py-1 rounded mb-2 inline-block"
                                        style={{ backgroundColor: getMarkerColor(time) }}
                                    >
                                        {time}
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
                    );
                })}
            </MapContainer>
            
            {/* Location counter */}
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm text-xs font-medium text-slate-600 z-[1000]">
                <i className="fa-solid fa-location-dot text-blue-500 mr-1.5"></i>
                {processedActivities.length} locations
            </div>
        </div>
    );
};

export default MapComponent;
