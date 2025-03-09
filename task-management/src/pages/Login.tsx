import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { login } from '../utils/api';
import { AxiosError } from 'axios';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleLogin = async (data: { email: string; password: string }) => {
        try {
            setErrorMessage(null);
            const { token } = await login(data);
            localStorage.setItem('token', token);
            navigate('/tasks');
        } catch (err) {
            console.error('Login error:', err);
            if (err instanceof AxiosError) {
                const message = err.response?.data?.msg || 'Unknown error';
                setErrorMessage(message);
            } else {
                setErrorMessage('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full flex flex-col items-center">
                <AuthForm onSubmit={handleLogin} />
                {errorMessage && (
                    <p className="mt-2 text-red-500 text-sm text-center">{errorMessage}</p>
                )}
                <div className="mt-4 text-center">
                    <p className="text-gray-600 mb-2">Don't have an account?</p>
                    <Link
                        to="/register"
                        className="inline-block w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Sign up
                    </Link>
                </div>
                <div className="mt-4">
                    <Link
                        to="/help"
                        className="text-blue-500 hover:underline"
                    >
                        Need help?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;