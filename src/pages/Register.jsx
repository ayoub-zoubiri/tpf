import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

import AuthLayout from '../components/auth/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';
import SocialButton from '../components/auth/SocialButton';

const Register = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (name, email, password) => {
        setError('');
        
        // Validate password matches backend requirements
        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
        if (!passwordRegex.test(password)) {
            setError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
            return;
        }
        
        setLoading(true);
        const result = await register(name, email, password);
        setLoading(false);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.error);
        }
    };

    return (
        <AuthLayout 
            title="Create your account" 
            subtitle="Start planning trips in seconds"
            error={error}
            bottomText="Already have an account?"
            bottomLink={
                <Link to="/login" className="text-blue-600 font-medium hover:text-blue-700">
                    Sign in
                </Link>
            }
        >
            <SocialButton text="Sign up with Google" />

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-slate-200"></div>
                <span className="text-xs text-slate-400">or</span>
                <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            <RegisterForm onSubmit={handleRegister} loading={loading} />
        </AuthLayout>
    );
};

export default Register;
