import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="flex h-screen items-center justify-center bg-slate-50">
            <i className="fa-solid fa-spinner animate-spin text-blue-600 text-3xl"></i>
        </div>
    );
};

export default LoadingScreen;
