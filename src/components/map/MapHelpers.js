import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Get marker color based on time
export const getMarkerColor = (time) => {
    const t = (time || '').toLowerCase();
    if (t.includes('morning')) return '#f59e0b'; // amber
    if (t.includes('afternoon')) return '#f97316'; // orange
    if (t.includes('evening') || t.includes('night')) return '#6366f1'; // indigo
    if (t.includes('lunch')) return '#ef4444'; // red
    return '#3b82f6'; // blue
};

// Get time icon
export const getTimeIcon = (time) => {
    const t = (time || '').toLowerCase();
    if (t.includes('morning')) return '☀️';
    if (t.includes('afternoon')) return '🌤️';
    if (t.includes('evening') || t.includes('night')) return '🌙';
    return '📍';
};

// Create numbered marker icon
export const createMarkerIcon = (time, number) => {
    const color = getMarkerColor(time);
    
    return L.divIcon({
        className: 'custom-marker',
        html: `
            <div style="
                width: 32px;
                height: 32px;
                background: ${color};
                border: 3px solid white;
                border-radius: 50%;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 13px;
                font-family: system-ui, sans-serif;
            ">
                ${number}
            </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
};
