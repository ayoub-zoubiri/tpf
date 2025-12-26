import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import SocialButton from '../components/auth/SocialButton';

const Login = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        setError('');
        setLoading(true);
        const result = await login(email, password);
        setLoading(false);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.error);
        }
    };

    return (
        <AuthLayout 
            title="Welcome back" 
            subtitle="Sign in to continue planning your trips"
            error={error}
            bottomText="Don't have an account?"
            bottomLink={
                <Link to="/register" className="text-blue-600 font-medium hover:text-blue-700">
                    Sign up free
                </Link>
            }
        >
            <SocialButton text="Continue with Google" />

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-slate-200"></div>
                <span className="text-xs text-slate-400">or</span>
                <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            <LoginForm onSubmit={handleLogin} loading={loading} />
        </AuthLayout>
    );
};

export default Login;
