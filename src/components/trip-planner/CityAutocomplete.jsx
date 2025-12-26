import React, { useState, useRef, useEffect, useCallback } from 'react';
import api from '../../api/axios';

const CityAutocomplete = ({ value, onChange }) => {
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoadingCities, setIsLoadingCities] = useState(false);
    const [selectedCityIndex, setSelectedCityIndex] = useState(-1);
    const [selectedCity, setSelectedCity] = useState(null);
    const suggestionRef = useRef(null);
    const inputRef = useRef(null);

    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    const searchCities = useCallback(
        debounce(async (query) => {
            if (!query || query.length < 2) {
                setCitySuggestions([]);
                setShowSuggestions(false);
                return;
            }
            setIsLoadingCities(true);
            try {
                const response = await api.get(`/cities/search?q=${encodeURIComponent(query)}&limit=8`);
                setCitySuggestions(response.data);
                setShowSuggestions(true);
                setSelectedCityIndex(-1);
            } catch (err) {
                setCitySuggestions([]);
            } finally {
                setIsLoadingCities(false);
            }
        }, 300),
        []
    );

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        onChange(city.label);
        setShowSuggestions(false);
        setCitySuggestions([]);
    };

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        onChange(newValue);
        setSelectedCity(null);
        searchCities(newValue);
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions || citySuggestions.length === 0) return;
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedCityIndex(prev => prev < citySuggestions.length - 1 ? prev + 1 : 0);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedCityIndex(prev => prev > 0 ? prev - 1 : citySuggestions.length - 1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedCityIndex >= 0) handleCitySelect(citySuggestions[selectedCityIndex]);
                break;
            case 'Escape':
                setShowSuggestions(false);
                break;
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (suggestionRef.current && !suggestionRef.current.contains(e.target) &&
                inputRef.current && !inputRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative">
            <input 
                ref={inputRef}
                type="text" 
                name="destination"
                value={value}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => value.length >= 2 && citySuggestions.length > 0 && setShowSuggestions(true)}
                placeholder="Start typing a city..." 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                autoComplete="off"
                required
            />
            {isLoadingCities ? (
                <i className="fa-solid fa-spinner animate-spin absolute right-4 top-1/2 -translate-y-1/2 text-blue-500"></i>
            ) : selectedCity ? (
                <img src={selectedCity.flag_url} alt="" className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-4 object-cover rounded"/>
            ) : (
                <i className="fa-solid fa-location-dot absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            )}
            
            {showSuggestions && citySuggestions.length > 0 && (
                <div ref={suggestionRef} className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
                    {citySuggestions.map((city, index) => (
                        <button
                            key={city.id}
                            type="button"
                            onClick={() => handleCitySelect(city)}
                            className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-blue-50 transition text-left ${
                                index === selectedCityIndex ? 'bg-blue-50' : ''
                            } ${index !== citySuggestions.length - 1 ? 'border-b border-slate-100' : ''}`}
                        >
                            <img src={city.flag_url} alt="" className="w-6 h-4 object-cover rounded shadow-sm"/>
                            <div>
                                <div className="font-medium text-slate-900">{city.city}</div>
                                <div className="text-xs text-slate-500">{city.country}</div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CityAutocomplete;
