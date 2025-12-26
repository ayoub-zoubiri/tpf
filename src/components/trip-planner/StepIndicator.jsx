import React from 'react';

const StepIndicator = ({ currentStep }) => {
    return (
        <div className="flex justify-center items-center gap-4 mt-8">
            {['Details', 'Generating', 'Itinerary'].map((label, i) => (
                <div key={i} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep > i + 1 ? 'bg-green-500 text-white' :
                        currentStep === i + 1 ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'
                    }`}>
                        {currentStep > i + 1 ? <i className="fa-solid fa-check text-xs"></i> : i + 1}
                    </div>
                    <span className={`text-sm hidden sm:block ${currentStep === i + 1 ? 'text-white' : 'text-slate-400'}`}>{label}</span>
                    {i < 2 && <div className={`w-8 h-px ${currentStep > i + 1 ? 'bg-green-500' : 'bg-slate-700'}`}></div>}
                </div>
            ))}
        </div>
    );
};

export default StepIndicator;
