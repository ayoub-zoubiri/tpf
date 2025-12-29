import React from 'react';

const HowItWorks = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
               
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                        Your trip in minutes, not weeks
                    </h2>
                    <p className="text-slate-500">Plan your next trip with AI and save hours of research</p>
                </div>
                <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {[
                        { step: '1', title: 'Tell me where', desc: 'Enter any destination', icon: 'fa-location-dot' },
                        { step: '2', title: 'Set preferences', desc: 'Budget, dates, interests', icon: 'fa-sliders' },
                        { step: '3', title: 'AI generates', desc: 'Day-by-day itinerary', icon: 'fa-wand-magic-sparkles' },
                        { step: '4', title: 'Book & go', desc: 'Save and start traveling', icon: 'fa-plane-departure' },
                    ].map((item, i) => (
                        <div key={i} className="text-center">
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <i className={`fa-solid ${item.icon} text-blue-600 text-xl`}></i>
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                            <p className="text-slate-500 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
