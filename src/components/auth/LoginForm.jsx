import React, { useState } from 'react';

const LoginForm = ({ onSubmit, loading }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(email, password);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                    placeholder="Email address"
                    required 
                />
            </div>
            <div>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                    placeholder="Password"
                    required 
                />
            </div>

            <div className="text-right">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">Forgot password?</a>
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-xl transition flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <i className="fa-solid fa-spinner animate-spin"></i>
                        Signing in...
                    </>
                ) : (
                    'Sign in'
                )}
            </button>
        </form>
    );
};

export default LoginForm;
