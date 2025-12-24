import React, { useState, useEffect, useRef, useCallback } from 'react';
import api from '../api/axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';
import ItineraryView from './ItineraryView';
import Footer from './Footer';

const TripPlanner = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        destination: '',
        startDate: null,
        endDate: null,
        budget: 'Moderate',
        interests: []
    });
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [step, setStep] = useState(1);
    const [showAuthModal, setShowAuthModal] = useState(false);

    const [citySuggestions, setCitySuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoadingCities, setIsLoadingCities] = useState(false);
    const [selectedCityIndex, setSelectedCityIndex] = useState(-1);
    const [selectedCity, setSelectedCity] = useState(null);
    const suggestionRef = useRef(null);
    const inputRef = useRef(null);

    const budgetOptions = [
        { id: 'Budget-friendly', label: 'Budget', range: '$50-100/day', icon: 'fa-wallet' },
        { id: 'Moderate', label: 'Moderate', range: '$100-200/day', icon: 'fa-credit-card' },
        { id: 'Luxury', label: 'Luxury', range: '$200+/day', icon: 'fa-gem' },
    ];

    const interestOptions = [
        { id: 'Adventure', label: 'Adventure', icon: 'fa-mountain' },
        { id: 'Relaxing', label: 'Relaxing', icon: 'fa-spa' },
        { id: 'Cultural', label: 'Cultural', icon: 'fa-landmark' },
        { id: 'Family', label: 'Family', icon: 'fa-users' },
        { id: 'Foodie', label: 'Foodie', icon: 'fa-utensils' },
        { id: 'Photography', label: 'Photography', icon: 'fa-camera' },
    ];

    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    const searchCities = useCallback(
        debounce(async (query) => {
            if (query.length < 2) {
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
        setFormData(prev => ({ ...prev, destination: city.label }));
        setShowSuggestions(false);
        setCitySuggestions([]);
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

    const handleInterestToggle = (interest) => {
        setFormData(prev => {
            const newInterests = prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest];
            return { ...prev, interests: newInterests };
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'destination') {
            setSelectedCity(null);
            searchCities(value);
        }
    };

    const calculateDuration = () => {
        if (!formData.startDate || !formData.endDate) return 3;
        const diffTime = Math.abs(new Date(formData.endDate) - new Date(formData.startDate));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        // Add 1 to include both start and end dates (Dec 25-27 = 3 days, not 2)
        return diffDays > 0 ? diffDays + 1 : 1;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) { setShowAuthModal(true); return; }
        setError(null);
        setResult(null);
        setStep(2);

        try {
            const response = await api.post('/plan', {
                destination: formData.destination,
                duration: calculateDuration(),
                budget: formData.budget,
                interests: formData.interests.join(', ')
            });
            // Backend returns 201 for successful creation
            if (response.status === 200 || response.status === 201) {
                setResult(response.data);
                setStep(3);
            } else {
                setError(response.data.error || 'Failed to generate itinerary');
                setStep(1);
            }
        } catch (err) {
            console.error('Trip generation error:', err);
            console.error('Full response data:', err.response?.data);
            // Extract meaningful error message from the API response
            const details = err.response?.data?.details;
            let errorMessage = err.response?.data?.error 
                || err.response?.data?.message 
                || err.message 
                || 'An error occurred while generating the itinerary.';
            
            // Append details if available (in debug mode)
            if (details) {
                errorMessage += ` (${details})`;
            }
            setError(errorMessage);
            setStep(1);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            {/* Auth Modal */}
            {showAuthModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center">
                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <i className="fa-solid fa-user-lock text-xl"></i>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Login Required</h2>
                        <p className="text-slate-500 text-sm mb-6">Sign in to generate and save your personalized itinerary.</p>
                        <div className="space-y-3">
                            <Link to="/login" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition">
                                Sign In
                            </Link>
                            <Link to="/register" className="block w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 rounded-xl transition">
                                Create Account
                            </Link>
                            <button onClick={() => setShowAuthModal(false)} className="text-slate-400 hover:text-slate-600 text-sm">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <main className="flex-grow pt-20">
                {/* Header */}
                <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-12">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-3">Plan Your Perfect Trip</h1>
                        <p className="text-slate-300 max-w-xl mx-auto">Tell us your preferences and let AI create a personalized itinerary</p>
                        
                        {/* Stepper */}
                        <div className="flex justify-center items-center gap-4 mt-8">
                            {['Details', 'Generating', 'Itinerary'].map((label, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                        step > i + 1 ? 'bg-green-500 text-white' :
                                        step === i + 1 ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'
                                    }`}>
                                        {step > i + 1 ? <i className="fa-solid fa-check text-xs"></i> : i + 1}
                                    </div>
                                    <span className={`text-sm hidden sm:block ${step === i + 1 ? 'text-white' : 'text-slate-400'}`}>{label}</span>
                                    {i < 2 && <div className={`w-8 h-px ${step > i + 1 ? 'bg-green-500' : 'bg-slate-700'}`}></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6 py-8 max-w-3xl">
                    {step === 1 && (
                        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100">
                            {error && (
                                <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 text-sm">
                                    <i className="fa-solid fa-circle-exclamation"></i>
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Destination */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Where do you want to go?</label>
                                    <div className="relative">
                                        <input 
                                            ref={inputRef}
                                            type="text" 
                                            name="destination"
                                            value={formData.destination}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyDown}
                                            onFocus={() => formData.destination.length >= 2 && citySuggestions.length > 0 && setShowSuggestions(true)}
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
                                </div>

                                {/* Dates */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">When are you traveling?</label>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <DatePicker
                                                selected={formData.startDate}
                                                onChange={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
                                                selectsStart
                                                startDate={formData.startDate}
                                                endDate={formData.endDate}
                                                minDate={new Date()}
                                                dateFormat="MMM d, yyyy"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                                placeholderText="Start date"
                                                required
                                            />
                                            <i className="fa-regular fa-calendar absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                                        </div>
                                        <div className="relative">
                                            <DatePicker
                                                selected={formData.endDate}
                                                onChange={(date) => setFormData(prev => ({ ...prev, endDate: date }))}
                                                selectsEnd
                                                startDate={formData.startDate}
                                                endDate={formData.endDate}
                                                minDate={formData.startDate || new Date()}
                                                dateFormat="MMM d, yyyy"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                                placeholderText="End date"
                                                required
                                            />
                                            <i className="fa-regular fa-calendar absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                                        </div>
                                    </div>
                                </div>

                                {/* Budget */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Budget</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {budgetOptions.map((option) => (
                                            <button 
                                                key={option.id}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, budget: option.id }))}
                                                className={`p-4 rounded-xl border-2 transition text-center ${
                                                    formData.budget === option.id 
                                                        ? 'border-blue-500 bg-blue-50' 
                                                        : 'border-slate-100 hover:border-slate-200'
                                                }`}
                                            >
                                                <i className={`fa-solid ${option.icon} text-lg mb-2 ${formData.budget === option.id ? 'text-blue-600' : 'text-slate-400'}`}></i>
                                                <div className="font-medium text-slate-900 text-sm">{option.label}</div>
                                                <div className="text-xs text-slate-500">{option.range}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Interests */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Travel style</label>
                                    <div className="flex flex-wrap gap-2">
                                        {interestOptions.map((option) => (
                                            <button
                                                key={option.id}
                                                type="button"
                                                onClick={() => handleInterestToggle(option.id)}
                                                className={`px-4 py-2 rounded-full border transition flex items-center gap-2 text-sm ${
                                                    formData.interests.includes(option.id) 
                                                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                                                }`}
                                            >
                                                <i className={`fa-solid ${option.icon}`}></i>
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Submit */}
                                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-xl transition flex justify-center items-center gap-2">
                                    <i className="fa-solid fa-wand-magic-sparkles"></i> Generate Itinerary
                                </button>
                                <p className="text-center text-slate-400 text-xs">Usually takes 30-60 seconds</p>
                            </form>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="bg-white rounded-2xl p-12 text-center">
                            <div className="relative w-24 h-24 mx-auto mb-6">
                                <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <img src="/logo.png" alt="Toplago" className="w-12 h-12 object-contain"/>
                                </div>
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">Crafting your itinerary...</h2>
                            <p className="text-slate-500">AI is building the perfect trip to {formData.destination}</p>
                        </div>
                    )}

                    {step === 3 && result && (
                        <div className="max-w-6xl mx-auto">
                            {/* Trip Header Card */}
                            <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900 mb-2">{result.trip_title}</h2>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                                                <i className="fa-solid fa-location-dot"></i> {result.destination}
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">
                                                <i className="fa-regular fa-calendar"></i> {result.duration} days
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
                                                <i className="fa-solid fa-wallet"></i> {result.budget}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {result.id && (
                                            <Link to={`/trips/${result.id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition flex items-center gap-2">
                                                <i className="fa-solid fa-eye"></i> View Full Trip
                                            </Link>
                                        )}
                                        <button onClick={() => setStep(1)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-medium transition flex items-center gap-2">
                                            <i className="fa-solid fa-plus"></i> New Trip
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <ItineraryView trip={result} />
                        </div>
                    )}

                    {step === 3 && error && (
                        <div className="bg-white rounded-2xl p-12 text-center">
                            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <i className="fa-solid fa-triangle-exclamation text-xl"></i>
                            </div>
                            <h2 className="text-lg font-bold text-slate-900 mb-2">Something went wrong</h2>
                            <p className="text-slate-500 mb-6">{error}</p>
                            <button onClick={() => setStep(1)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition">
                                Try Again
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TripPlanner;
