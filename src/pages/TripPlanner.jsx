import React, { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Sub-components
import AuthModal from '../components/trip-planner/AuthModal';
import HeroSection from '../components/trip-planner/HeroSection';
import TripForm from '../components/trip-planner/TripForm';
import LoadingState from '../components/trip-planner/LoadingState';
import TripResults from '../components/trip-planner/TripResults';
import ErrorState from '../components/trip-planner/ErrorState';

const TripPlanner = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({ destination: '', startDate: null, endDate: null, budget: 'Moderate', interests:[] });
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [step, setStep] = useState(1);
    const [showAuthModal, setShowAuthModal] = useState(false);

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
            const details = err.response?.data?.details;
            let errorMessage = err.response?.data?.error 
                || err.response?.data?.message 
                || err.message 
                || 'An error occurred while generating the itinerary.';
            
            if (details) {
                errorMessage += ` (${details})`;
            }
            setError(errorMessage);
            setStep(1); 
            setStep(3);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}

            <main className="flex-grow pt-20">
                <HeroSection step={step} />

                <div className={`px-6 py-8 mx-auto ${step === 3 ? 'w-full' : 'container max-w-3xl'}`}>
                    {step === 1 && ( <TripForm  formData={formData} setFormData={setFormData} onSubmit={handleSubmit} error={error}/>)}

                    {step === 2 && <LoadingState destination={formData.destination} />}

                    {step === 3 && result && (
                        <TripResults result={result} onReset={() => setStep(1)} />)}

                    {step === 3 && error && (<ErrorState error={error} onRetry={() => setStep(1)} />)}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TripPlanner;

