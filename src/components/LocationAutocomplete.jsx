import React, { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';

const LocationAutocomplete = ({ location, setLocation }) => {
  const [predictions, setPredictions] = useState([]);
  const [inputValue, setInputValue] = useState(location || '');
  const autocompleteServiceRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!window.google || !window.google.maps || !window.google.maps.places) return;
    autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
  }, []);

  const fetchPredictions = (input) => {
    if (!autocompleteServiceRef.current || !input) return;
    autocompleteServiceRef.current.getPlacePredictions(
      {
        input,
        componentRestrictions: { country: 'in' },
      },
      (results) => {
        setPredictions(results || []);
      }
    );
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      fetchPredictions(value);
    }, 300); // debounce
  };

  const handleSelect = (description) => {
    setLocation(description);
    setInputValue(description);
    setPredictions([]);
  };

  return (
    <div className="relative w-full">
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={16} />
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter Event Location"
        className="pl-10 pr-4 py-3 w-full bg-[#2b2b2b] border border-white/20 rounded-lg text-sm text-white focus:outline-none focus:border-white/40"
      />

      {predictions.length > 0 && (
        <div className="absolute top-full mt-1 left-0 w-full bg-[#1e1e1e] border border-white/20 rounded-xl shadow-lg z-50 text-sm max-h-60 overflow-y-auto">
          {predictions.map((prediction) => (
            <div
              key={prediction.place_id}
              onClick={() => handleSelect(prediction.description)}
              className="px-4 py-3 hover:bg-white/10 cursor-pointer text-white/80"
            >
              {prediction.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationAutocomplete;
