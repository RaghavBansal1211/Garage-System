import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../UserContext';
import { useNavigate } from 'react-router-dom';





const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const {register,handleSubmit,formState: { errors },} = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        console.log(data);
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/login', data,{
                withCredentials: true
            });

            // If login is successful
            console.log('Login successful:', response.data);
    
            login(response.data.details);
            navigate('/dashboard');
            // e.g., save token to localStorage: localStorage.setItem('token', response.data.token)
        } 
        catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error('Login error:', error.response.data.message || error.response.data);
            } else {
                console.error('Network error:', error.message);
            }
        } 
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
                <p className="text-sm text-gray-600 mb-6">Please login to your account to continue</p>
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                    <div>
                        <label className="block mb-1 font-medium">Email Address</label>
                        <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full p-3 border rounded-xl bg-gray-50"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Invalid email format',
                            },
                        })}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full p-3 border rounded-xl bg-gray-50"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: { value: 8, message: 'Minimum 8 characters' },
                        })}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-xl font-semibold transition ${
                        loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-black to-gray-800 text-white hover:opacity-90'
                        }`}
                    >
                        {loading ? 'Logging in...' : 'Log in →'}
                    </button>
                </form>
            </div>
        </div>
  );
};

export default LoginForm;
