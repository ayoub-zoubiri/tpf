import React from 'react';

const ErrorState = ({ error, onRetry }) => {
    return (
        <div className="bg-white rounded-2xl p-12 text-center">
            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-triangle-exclamation text-xl"></i>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Something went wrong</h2>
            <p className="text-slate-500 mb-6">{error}</p>
            <button onClick={onRetry} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition">
                Try Again
            </button>
        </div>
    );
};

export default ErrorState;
