import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTrip } from '../context/TripContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Sub-components
import AuthModal from '../components/trip-planner/AuthModal';

import TripForm from '../components/trip-planner/TripForm';
import LoadingState from '../components/trip-planner/LoadingState';
import TripResults from '../components/trip-planner/TripResults';
import ErrorState from '../components/trip-planner/ErrorState';

const TripPlanner = () => {
    const { user } = useAuth();
    const { 
        plannerStep, 
        plannerData, 
        setPlannerData, 
        generatedTrip, 
        plannerLoading, 
        plannerError, 
        generateTrip,
        resetPlanner
    } = useTrip();

    const [showAuthModal, setShowAuthModal] = useState(false);

    // Reset planner on mount if coming back? Or keep state?
    // User often wants to keep state if they navigate away and back.
    // If we want to reset, use useEffect. For now, let's keep it (persistence is a feature).

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) { setShowAuthModal(true); return; }
        generateTrip();
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}

            <main className="flex-grow pt-20">
              

                <div className={`px-6 py-8 mx-auto ${plannerStep === 3 ? 'w-full' : 'container max-w-3xl'}`}>
                    {plannerStep === 1 && ( 
                        <TripForm  
                            formData={plannerData} 
                            setFormData={setPlannerData} 
                            onSubmit={handleSubmit} 
                            error={plannerError}
                        />
                    )}

                    {plannerStep === 2 && <LoadingState destination={plannerData.destination} />}

                    {plannerStep === 3 && generatedTrip && (
                        <TripResults result={generatedTrip} onReset={resetPlanner} />
                    )}

                    {plannerStep === 3 && plannerError && (
                        <ErrorState error={plannerError} onRetry={resetPlanner} />
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TripPlanner;

