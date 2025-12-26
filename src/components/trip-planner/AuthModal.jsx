import React from 'react';
import { Link } from 'react-router-dom';

const AuthModal = ({ onClose }) => {
    return (
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
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-sm">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
