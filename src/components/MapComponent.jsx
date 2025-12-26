import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Sub-components & Helpers
import { MapBounds, MapInvalidator } from './map/MapEffects';
import MapMarkers from './map/MapMarkers';
import MapEmptyState from './map/MapEmptyState';
import './map/MapHelpers'; // Import to execute Leaflet Icon fixes

const MapComponent = ({ activities, day, destination }) => {
    // Process activities - use coordinates from backend
    const processedActivities = useMemo(() => {
        if (!activities || activities.length === 0) return [];
        
        return activities
            .map((activity, index) => {
                // Check if activity has valid coordinates from backend
                const lat = parseFloat(activity.latitude);
                const lng = parseFloat(activity.longitude);
                
                if (!isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0) {
                    // Add small offset to prevent overlapping markers
                    const angle = (index / activities.length) * 2 * Math.PI;
                    const offset = 0.0003 * index;
                    
                    return {
                        ...activity,
                        lat: lat + (Math.sin(angle) * offset),
                        lng: lng + (Math.cos(angle) * offset),
                        number: index + 1,
                        hasCoords: true
                    };
                }
                return null;
            })
            .filter(a => a !== null);
    }, [activities]);

    // Calculate center
    const center = useMemo(() => {
        if (processedActivities.length > 0) {
            const avgLat = processedActivities.reduce((sum, a) => sum + a.lat, 0) / processedActivities.length;
            const avgLng = processedActivities.reduce((sum, a) => sum + a.lng, 0) / processedActivities.length;
            return [avgLat, avgLng];
        }
        return [33.5731, -7.5898]; // Default (Casablanca)
    }, [processedActivities]);

    // Path for route line
    const pathCoordinates = processedActivities.map(a => [a.lat, a.lng]);

    // Show message if no activities have coordinates
    if (processedActivities.length === 0) {
        return <MapEmptyState />;
    }

    return (
        <div className="h-full w-full relative">
            <MapContainer 
                center={center} 
                zoom={13} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                
                <MapInvalidator />
                <MapBounds markers={processedActivities} />

                {/* Route line */}
                {pathCoordinates.length > 1 && (
                    <Polyline 
                        positions={pathCoordinates} 
                        pathOptions={{ 
                            color: '#3b82f6', 
                            weight: 3, 
                            opacity: 0.6, 
                            dashArray: '8, 6' 
                        }} 
                    />
                )}

                {/* Activity markers */}
                <MapMarkers activities={processedActivities} />
            </MapContainer>
            
            {/* Activity counter */}
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm text-xs font-medium text-slate-600 z-[1000]">
                <i className="fa-solid fa-location-dot text-blue-500 mr-1.5"></i>
                {processedActivities.length} locations
            </div>
        </div>
    );
};

export default MapComponent;

