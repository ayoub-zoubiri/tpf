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
    const [step, setStep] = useState(1); // 1: Details, 2: AI Generation, 3: Your Itinerary
    const [showAuthModal, setShowAuthModal] = useState(false);

    // City autocomplete state
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoadingCities, setIsLoadingCities] = useState(false);
    const [selectedCityIndex, setSelectedCityIndex] = useState(-1);
    const [selectedCity, setSelectedCity] = useState(null);
    const suggestionRef = useRef(null);
    const inputRef = useRef(null);

    const budgetOptions = [
        { id: 'Budget-friendly', label: 'Budget', range: '$50-100/day', icon: 'fa-wallet', color: 'text-green-500' },
        { id: 'Moderate', label: 'Moderate', range: '$100-200/day', icon: 'fa-credit-card', color: 'text-blue-500' },
        { id: 'Luxury', label: 'Luxury', range: '$200+/day', icon: 'fa-gem', color: 'text-purple-500' },
    ];

    const interestOptions = [
        { id: 'Adventure', label: 'Adventure', icon: 'fa-mountain', color: 'text-orange-500' },
        { id: 'Relaxing', label: 'Relaxing', icon: 'fa-spa', color: 'text-blue-400' },
        { id: 'Cultural', label: 'Cultural', icon: 'fa-landmark', color: 'text-purple-500' },
        { id: 'Family', label: 'Family', icon: 'fa-users', color: 'text-green-500' },
        { id: 'Foodie', label: 'Foodie', icon: 'fa-utensils', color: 'text-red-500' },
        { id: 'Photography', label: 'Photography', icon: 'fa-camera', color: 'text-pink-500' },
    ];

    // Debounce function for city search
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    // Search cities with debounce
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
                console.error('Error searching cities:', err);
                setCitySuggestions([]);
            } finally {
                setIsLoadingCities(false);
            }
        }, 300),
        []
    );

    // Handle city selection
    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setFormData(prev => ({ ...prev, destination: city.label }));
        setShowSuggestions(false);
        setCitySuggestions([]);
    };

    // Handle keyboard navigation in suggestions
    const handleKeyDown = (e) => {
        if (!showSuggestions || citySuggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedCityIndex(prev => 
                    prev < citySuggestions.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedCityIndex(prev => 
                    prev > 0 ? prev - 1 : citySuggestions.length - 1
                );
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedCityIndex >= 0) {
                    handleCitySelect(citySuggestions[selectedCityIndex]);
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                break;
        }
    };

    // Close suggestions when clicking outside
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
        
        // Trigger city search for destination field
        if (name === 'destination') {
            setSelectedCity(null);
            searchCities(value);
        }
    };

    const calculateDuration = () => {
        if (!formData.startDate || !formData.endDate) return 3; // Default
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays > 0 ? diffDays : 1;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setShowAuthModal(true);
            return;
        }

        setError(null);
        setResult(null);
        setStep(2); // AI Generation Step

        const duration = calculateDuration();
        const payload = {
            destination: formData.destination,
            duration: duration,
            budget: formData.budget,
            interests: formData.interests.join(', ')
        };

        try {
            const response = await api.post('/plan', payload);

            if (response.status === 200) {
                setResult(response.data);
                setStep(3); // Itinerary Step
            } else {
                setError(response.data.error || 'Failed to generate itinerary');
                setStep(1);
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while generating the itinerary.');
            setStep(1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col relative">
            <Navbar />

            {/* Auth Modal */}
            {showAuthModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all scale-100">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fa-solid fa-user-lock text-2xl"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
                        <p className="text-gray-500 mb-8">Please log in or create an account to generate and save your personalized travel itinerary.</p>
                        <div className="flex flex-col gap-3">
                            <Link to="/login" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition">
                                Log In
                            </Link>
                            <Link to="/register" className="w-full bg-white border-2 border-gray-200 hover:border-blue-200 text-gray-700 font-bold py-3 rounded-xl transition">
                                Create Account
                            </Link>
                            <button 
                                onClick={() => setShowAuthModal(false)}
                                className="mt-2 text-gray-400 hover:text-gray-600 text-sm font-medium transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Plan Your Perfect Trip with AI</h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">Tell us your preferences and let our AI create a personalized itinerary tailored just for you</p>
                </div>

                {/* Stepper */}
                <div className="flex justify-center items-center mb-12 text-sm font-medium text-gray-500">
                    <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                        Trip Details
                    </div>
                    <div className={`w-16 h-px mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                    <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                        AI Generation
                    </div>
                    <div className={`w-16 h-px mx-4 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                    <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
                        Your Itinerary
                    </div>
                </div>

                {step === 1 && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 animate-fade-in">
                                <i className="fa-solid fa-circle-exclamation text-xl"></i>
                                <span className="font-medium">{error}</span>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Destination with Autocomplete */}
                            <div>
                                <label className="block text-base font-semibold text-gray-900 mb-3">Where do you want to go?</label>
                                <div className="relative">
                                    <input 
                                        ref={inputRef}
                                        type="text" 
                                        name="destination"
                                        value={formData.destination}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                        onFocus={() => formData.destination.length >= 2 && citySuggestions.length > 0 && setShowSuggestions(true)}
                                        placeholder="Start typing a city name..." 
                                        className="w-full pl-6 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-700 placeholder-gray-400"
                                        autoComplete="off"
                                        required
                                    />
                                    {isLoadingCities ? (
                                        <i className="fa-solid fa-spinner fa-spin absolute right-6 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                                    ) : selectedCity ? (
                                        <img 
                                            src={selectedCity.flag_url} 
                                            alt={selectedCity.country}
                                            className="absolute right-6 top-1/2 transform -translate-y-1/2 w-6 h-4 object-cover rounded shadow-sm"
                                        />
                                    ) : (
                                        <i className="fa-solid fa-location-dot absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                    )}
                                    
                                    {/* Autocomplete Dropdown */}
                                    {showSuggestions && citySuggestions.length > 0 && (
                                        <div 
                                            ref={suggestionRef}
                                            className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden animate-fade-in"
                                        >
                                            {citySuggestions.map((city, index) => (
                                                <button
                                                    key={city.id}
                                                    type="button"
                                                    onClick={() => handleCitySelect(city)}
                                                    className={`w-full px-4 py-3 flex items-center gap-4 hover:bg-blue-50 transition text-left ${
                                                        index === selectedCityIndex ? 'bg-blue-50' : ''
                                                    } ${index !== citySuggestions.length - 1 ? 'border-b border-gray-100' : ''}`}
                                                >
                                                    <img 
                                                        src={city.flag_url} 
                                                        alt={city.country}
                                                        className="w-8 h-5 object-cover rounded shadow-sm flex-shrink-0"
                                                        onError={(e) => { e.target.style.display = 'none'; }}
                                                    />
                                                    <div className="flex-grow min-w-0">
                                                        <div className="font-medium text-gray-900 truncate">{city.city}</div>
                                                        <div className="text-sm text-gray-500 truncate">{city.country}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {selectedCity && (
                                    <p className="mt-2 text-sm text-green-600 flex items-center gap-2">
                                        <i className="fa-solid fa-check-circle"></i>
                                        <span>{selectedCity.flag_emoji} {selectedCity.city}, {selectedCity.country}</span>
                                    </p>
                                )}
                            </div>

                            {/* Dates */}
                            <div>
                                <label className="block text-base font-semibold text-gray-900 mb-3">When are you traveling?</label>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <span className="absolute left-4 top-2 text-xs text-gray-500 z-10">Check-in</span>
                                        <DatePicker
                                            selected={formData.startDate}
                                            onChange={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
                                            selectsStart
                                            startDate={formData.startDate}
                                            endDate={formData.endDate}
                                            minDate={new Date()}
                                            dateFormat="MMMM d, yyyy"
                                            className="w-full pl-4 pr-10 pt-6 pb-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-700 cursor-pointer"
                                            wrapperClassName="w-full"
                                            placeholderText="Select Date"
                                            required
                                        />
                                        <i className="fa-regular fa-calendar absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10"></i>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute left-4 top-2 text-xs text-gray-500 z-10">Check-out</span>
                                        <DatePicker
                                            selected={formData.endDate}
                                            onChange={(date) => setFormData(prev => ({ ...prev, endDate: date }))}
                                            selectsEnd
                                            startDate={formData.startDate}
                                            endDate={formData.endDate}
                                            minDate={formData.startDate || new Date()}
                                            dateFormat="MMMM d, yyyy"
                                            className="w-full pl-4 pr-10 pt-6 pb-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-700 cursor-pointer"
                                            wrapperClassName="w-full"
                                            placeholderText="Select Date"
                                            required
                                        />
                                        <i className="fa-regular fa-calendar absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10"></i>
                                    </div>
                                </div>
                            </div>

                            {/* Budget */}
                            <div>
                                <label className="block text-base font-semibold text-gray-900 mb-3">What's your budget range?</label>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {budgetOptions.map((option) => (
                                        <div 
                                            key={option.id}
                                            onClick={() => setFormData(prev => ({ ...prev, budget: option.id }))}
                                            className={`cursor-pointer p-6 rounded-xl border-2 transition flex flex-col items-center text-center ${formData.budget === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}
                                        >
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${option.color} bg-white shadow-sm`}>
                                                <i className={`fa-solid ${option.icon}`}></i>
                                            </div>
                                            <div className="font-bold text-gray-900">{option.label}</div>
                                            <div className="text-sm text-gray-500">{option.range}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Travel Style */}
                            <div>
                                <label className="block text-base font-semibold text-gray-900 mb-3">What's your travel style? (Select all that apply)</label>
                                <div className="flex flex-wrap gap-3">
                                    {interestOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            type="button"
                                            onClick={() => handleInterestToggle(option.id)}
                                            className={`px-6 py-3 rounded-full border transition flex items-center gap-2 font-medium ${formData.interests.includes(option.id) ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                                        >
                                            <i className={`fa-solid ${option.icon} ${formData.interests.includes(option.id) ? 'text-blue-600' : option.color}`}></i>
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-lg font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 flex justify-center items-center gap-2">
                                <i className="fa-solid fa-wand-magic-sparkles"></i> Generate My Custom Itinerary
                            </button>
                            <p className="text-center text-gray-400 text-sm">Usually takes 30-60 seconds to generate your personalized trip</p>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div className="bg-white rounded-2xl shadow-xl p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                        <div className="relative w-32 h-32 mb-8">
                            {/* Track */}
                            <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                            
                            {/* Rotating Container */}
                            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '1.5s' }}>
                                {/* Active Trail (Half Circle) */}
                                <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-blue-600 border-r-blue-600 border-b-transparent border-l-transparent transform rotate-[-45deg]"></div>
                                
                                {/* Plane Icon - Leading the trail */}
                                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-[20%] rotate-45">
                                    <i className="fa-solid fa-plane text-blue-600 text-2xl drop-shadow-sm"></i>
                                </div>
                            </div>
                            
                            {/* Center Logo */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img src="/logo.png" alt="Toplago" className="w-16 h-16 object-contain animate-pulse" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Crafting your perfect itinerary...</h2>
                        <p className="text-gray-500 max-w-md">Our AI is analyzing your preferences to build the best trip to {formData.destination}.</p>
                    </div>
                )}

                {step === 3 && result && (
                    <div className="animate-fade-in">
                        <div className="bg-blue-600 p-8 text-white rounded-2xl shadow-xl mb-8 flex justify-between items-start">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">{result.trip_title}</h2>
                                <p className="text-blue-100 text-lg">{result.summary}</p>
                            </div>
                            <div className="flex gap-2">
                                {result.id && (
                                    <Link to={`/trips/${result.id}`} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition backdrop-blur-sm flex items-center gap-2">
                                        <i className="fa-solid fa-eye"></i> View Details
                                    </Link>
                                )}
                                <button onClick={() => setStep(1)} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition backdrop-blur-sm">
                                    Plan Another Trip
                                </button>
                            </div>
                        </div>
                        
                        <ItineraryView trip={result} />
                    </div>
                )}
                
                {step === 3 && error && (
                     <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
                        <p className="text-gray-500 mb-6">{error}</p>
                        <button onClick={() => setStep(1)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition">
                            Try Again
                        </button>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default TripPlanner;
