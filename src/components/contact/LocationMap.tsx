
import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

const LocationMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  // Operating locations data
  const locations = [
    {
      name: "BeeBotix Headquarters",
      address: "123 Tech Avenue, Innovation District, CA 90210",
      lat: 34.0522,
      lng: -118.2437,
      type: "headquarters"
    },
    {
      name: "BeeBotix Lab - Silicon Valley",
      address: "456 Innovation Blvd, Palo Alto, CA 94301",
      lat: 37.4419,
      lng: -122.1430,
      type: "lab"
    },
    {
      name: "BeeBotix Training Center",
      address: "789 Education Street, San Francisco, CA 94102",
      lat: 37.7749,
      lng: -122.4194,
      type: "training"
    },
    {
      name: "BeeBotix Research Hub",
      address: "321 Research Park, Berkeley, CA 94720",
      lat: 37.8715,
      lng: -122.2730,
      type: "research"
    }
  ];

  useEffect(() => {
    if (!mapRef.current) return;

    // Create OpenStreetMap using Leaflet
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = initMap;
    document.head.appendChild(script);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    function initMap() {
      // @ts-ignore
      const L = window.L;
      
      // Initialize map centered on California
      const map = L.map(mapRef.current).setView([37.0902, -120.7129], 6);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Add markers for each location
      locations.forEach(location => {
        const markerColor = location.type === 'headquarters' ? '#F9D923' : 
                          location.type === 'lab' ? '#F97316' : 
                          location.type === 'training' ? '#0D9488' : '#1A1F2C';

        // Create custom marker HTML
        const markerHtml = `
          <div style="
            background: ${markerColor};
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              width: 8px;
              height: 8px;
              background: white;
              border-radius: 50%;
            "></div>
          </div>
        `;

        const customIcon = L.divIcon({
          html: markerHtml,
          className: 'custom-marker',
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });

        const marker = L.marker([location.lat, location.lng], { icon: customIcon })
          .addTo(map)
          .bindPopup(`
            <div style="padding: 8px; min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; color: #1A1F2C; font-weight: bold;">${location.name}</h3>
              <p style="margin: 0; color: #4B5563; font-size: 14px;">${location.address}</p>
            </div>
          `);
      });

      // Fit map to show all markers
      const group = new L.featureGroup(locations.map(loc => L.marker([loc.lat, loc.lng])));
      map.fitBounds(group.getBounds().pad(0.1));
    }

    return () => {
      // Cleanup
      const leafletScript = document.querySelector('script[src*="leaflet"]');
      const leafletLink = document.querySelector('link[href*="leaflet"]');
      if (leafletScript) document.head.removeChild(leafletScript);
      if (leafletLink) document.head.removeChild(leafletLink);
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-beebotix-navy mb-2 flex items-center">
          <MapPin className="h-5 w-5 text-beebotix-yellow mr-2" />
          Our Locations
        </h2>
        <p className="text-beebotix-gray-dark">
          We operate from multiple locations across California to serve you better.
        </p>
      </div>
      
      <div className="relative">
        <div ref={mapRef} className="w-full h-80"></div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {locations.map((location, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-4 h-4 rounded-full mt-1 ${
                location.type === 'headquarters' ? 'bg-beebotix-yellow' :
                location.type === 'lab' ? 'bg-beebotix-orange' :
                location.type === 'training' ? 'bg-teal-500' : 'bg-beebotix-navy'
              }`}></div>
              <div>
                <h4 className="font-medium text-beebotix-navy text-sm">{location.name}</h4>
                <p className="text-xs text-beebotix-gray-dark">{location.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
