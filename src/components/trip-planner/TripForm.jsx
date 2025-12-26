import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CityAutocomplete from './CityAutocomplete';

const TripForm = ({ formData, setFormData, onSubmit, error }) => {
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

    const handleInterestToggle = (interest) => {
        setFormData(prev => {
            const newInterests = prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest];
            return { ...prev, interests: newInterests };
        });
    };

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100">
            {error && (
                <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 text-sm">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    {error}
                </div>
            )}
            <form onSubmit={onSubmit} className="space-y-6">
                {/* Destination */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Where do you want to go?</label>
                    <CityAutocomplete 
                        value={formData.destination} 
                        onChange={(val) => handleChange('destination', val)} 
                    />
                </div>

                {/* Dates */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">When are you traveling?</label>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="relative">
                            <DatePicker
                                selected={formData.startDate}
                                onChange={(date) => handleChange('startDate', date)}
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
                                onChange={(date) => handleChange('endDate', date)}
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
                                onClick={() => handleChange('budget', option.id)}
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
    );
};

export default TripForm;
