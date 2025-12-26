import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

// Fit map to markers
export const MapBounds = ({ markers }) => {
    const map = useMap();
    useEffect(() => {
        if (markers.length > 0) {
            const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]));
            map.flyToBounds(bounds, { padding: [50, 50], maxZoom: 14, duration: 0.5 });
        }
    }, [markers, map]);
    return null;
};

// Fix map rendering issues on resize or layout change
export const MapInvalidator = () => {
    const map = useMap();
    useEffect(() => {
        // Invalidate size immediately
        map.invalidateSize();
        
        // And after a short delay to account for CSS transitions
        const timer = setTimeout(() => {
            map.invalidateSize();
        }, 400);

        const handleResize = () => map.invalidateSize();
        window.addEventListener('resize', handleResize);
        
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, [map]);
    return null;
};
