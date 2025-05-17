import React, { useState, useRef,useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const FlyToLocation = ({ coordinates }) => {
  const map = useMap();

  useEffect(() => {
    if (coordinates) {
      map.flyTo(coordinates, 13, { duration: 1.5 });
    }
  }, [coordinates, map]);

  return null;
};

const PhotonLocationInput = ({ location, setLocation }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [coordinates, setCoordinates] = useState(null);
  const timeoutRef = useRef(null);
  const mapRef = useRef(null);


  const fetchLocations = async (text) => {
    if (!text) return;
    try {
      const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(text)}&limit=5`);
      const data = await res.json();
      const results = data.features.map((f) => ({
        name: f.properties.name,
        city: f.properties.city,
        country: f.properties.country,
        lat: f.geometry.coordinates[1],
        lon: f.geometry.coordinates[0],
      }));
      setSuggestions(results);
    } catch (err) {
      console.error("Failed to fetch locations", err);
    }
  };

  const handleChange = (e) => {
    const text = e.target.value;
    setQuery(text);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => fetchLocations(text), 300);
  };

  const handleSelect = (item) => {
    const fullLocation = `${item.name}, ${item.city || ''}, ${item.country}`;
    setQuery(fullLocation);
    setLocation(fullLocation);
    setCoordinates([item.lat, item.lon]);
    setSuggestions([]);
  };

  const handleFallback = async () => {
  setSuggestions([]); // hide dropdown immediately
  const customLabel = query.trim();
  setQuery(customLabel);
  setLocation(customLabel);

  try {
    const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(customLabel)}&limit=1`);
    const data = await res.json();

    if (data.features.length > 0) {
      const f = data.features[0];
      const resultLabel = `${f.properties.name} ${f.properties.city || ''} ${f.properties.country}`.toLowerCase();
      const isMatch = customLabel.toLowerCase().split(' ').every((word) => resultLabel.includes(word));

      if (isMatch) {
        setCoordinates([f.geometry.coordinates[1], f.geometry.coordinates[0]]);
      } else {
        setCoordinates(null);
      }
    } else {
      setCoordinates(null);
    }
  } catch (err) {
    console.error("Fallback fetch failed", err);
    setCoordinates(null);
  }
};

useEffect(() => {
  if (mapRef.current && coordinates) {
    mapRef.current.flyTo(coordinates, 13, { duration: 1.5 });

  }
}, [coordinates]);



  return (
    <div className="relative space-y-4">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={16} />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Enter Offline Location"
          className="pl-10 pr-4 py-3 w-full bg-[#2b2b2b] border border-white/20 rounded-lg text-sm text-white focus:outline-none focus:border-white/40"
        />
        {(suggestions.length > 0) && (
  <div className="absolute left-0 right-0 mt-1 bg-[#1e1e1e] border border-white/20 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto text-sm">
    {suggestions.map((s, idx) => (
      <div
        key={idx}
        onClick={() => handleSelect(s)}
        className="px-4 py-2 text-white hover:bg-white/10 cursor-pointer"
      >
        {s.name}, {s.city || ''}, {s.country}
      </div>
    ))}

    {/* Show fallback only when suggestions exist */}
    {query.trim() && (
      <div
        onClick={handleFallback}
        className="px-4 py-2 text-white hover:bg-white/10 cursor-pointer border-t border-white/10"
      >
        Use "{query}" as custom location
      </div>
    )}
  </div>
)}

      </div>

     {coordinates && (
  <MapContainer
    center={coordinates}
    zoom={13}
    scrollWheelZoom={false}
    className="h-64 w-full rounded-lg z-10"
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
    />
    <Marker position={coordinates}>
      <Popup>{location}</Popup>
    </Marker>

    {/* Dynamically pan to updated coordinates */}
    <FlyToLocation coordinates={coordinates} />
  </MapContainer>
)}


    </div>
  );
};

export default PhotonLocationInput;
