import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { register } from '../utils/api';

const Register: React.FC = () => {
    const navigate = useNavigate();

    const handleRegister = async (data: { email: string; password: string; name: string }) => {
        try {
            const { token } = await register(data);
            localStorage.setItem('token', token);
            navigate('/tasks');
        } catch (err) {
            console.log(err);
            alert('Registration failed' + err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full flex flex-col items-center">
                <AuthForm onSubmit={handleRegister} isRegister />
                <div className="mt-4 text-center">
                    <p className="text-gray-600 mb-2">Already have an account?</p>
                    <Link
                        to="/login"
                        className="inline-block w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Sign in
                    </Link>
                </div>
                <div className="mt-4">
                    <Link to="/help" className="text-blue-500 hover:underline">
                        Need help?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;