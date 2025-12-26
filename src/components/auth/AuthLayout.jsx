import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle, error, bottomLink, bottomText }) => {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                {/* Logo */}
                <Link to="/" className="flex items-center justify-center gap-2 mb-8">
                    <img src="/logo.png" alt="Toplago" className="w-10 h-10 object-contain" />
                    <span className="text-xl font-bold text-white">Toplago</span>
                </Link>

                {/* Card */}
                <div className="bg-white rounded-2xl p-8">
                    <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">{title}</h1>
                    <p className="text-slate-500 text-center text-sm mb-6">{subtitle}</p>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm mb-4 flex items-center gap-2">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            {error}
                        </div>
                    )}

                    {children}

                    {/* Footer Link */}
                    {bottomLink && (
                        <p className="mt-6 text-center text-sm text-slate-500">
                            {bottomText}{' '}
                            {bottomLink}
                        </p>
                    )}
                </div>

                {/* Footer Terms */}
                <p className="text-center text-slate-500 text-xs mt-6">
                    By continuing, you agree to our{' '}
                    <a href="#" className="text-slate-400 hover:text-white">Terms</a> and{' '}
                    <a href="#" className="text-slate-400 hover:text-white">Privacy Policy</a>
                </p>
            </div>
        </div>
    );
};

export default AuthLayout;
