import React from 'react';
import StepIndicator from './StepIndicator';

const HeroSection = ({ step }) => {
    return (
        <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-12">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">Plan Your Perfect Trip</h1>
                <p className="text-slate-300 max-w-xl mx-auto">Tell us your preferences and let AI create a personalized itinerary</p>
                
                <StepIndicator currentStep={step} />
            </div>
        </div>
    );
};

export default HeroSection;
