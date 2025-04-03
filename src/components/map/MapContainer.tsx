import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { WasteData } from '../../context/WasteDataContext';
interface MapContainerProps {
  locations: WasteData[];
}
export const MapContainer: React.FC<MapContainerProps> = ({
  locations
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      mapRef.current.style.height = '100%';
      mapRef.current.style.minHeight = '400px';
      const map = L.map(mapRef.current).setView([9.082, 8.6753], 6);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      map.invalidateSize();
      mapInstanceRef.current = map;
    }

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    if (mapInstanceRef.current && locations.length > 0) {
      locations.forEach(location => {
        const size = Math.min(50, Math.max(20, Number(location.waste_amount) / 30));
        const marker = L.circleMarker([Number(location.latitude), Number(location.longitude)], {
          radius: size / 3,
          fillColor: '#10B981',
          color: '#047857',
          weight: 1,
          opacity: 0.8,
          fillOpacity: 0.6
        }).addTo(mapInstanceRef.current!);
        marker.bindPopup(`
          <b>${location.city}, ${location.state}</b><br>
          Waste: ${Number(location.waste_amount).toFixed(1)} tons<br>
          Type: ${location.waste_type}<br>
          Date: ${new Date(location.collection_date).toLocaleDateString()}<br>
          ${location.notes ? `<small>${location.notes}</small>` : ''}
        `);
        markersRef.current.push(marker);
      });
    }
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [locations]);
  return <div ref={mapRef} className="w-full h-full" style={{
    minHeight: '400px'
  }} />;
};