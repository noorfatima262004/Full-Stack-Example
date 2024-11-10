import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      navigate('/products');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-200 via-green-300 to-green-400">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md transform transition duration-500 hover:scale-105"
      >
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Login</h2>
        <div className="mb-6">
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-400"
          />
        </div>
        <div className="mb-8">
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-400"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700 transition duration-300"
        >
          Login
        </button>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/')}
            className="text-green-700 font-semibold cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
