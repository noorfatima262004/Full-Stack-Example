import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-300 via-green-400 to-green-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md transform transition duration-500 hover:scale-105"
      >
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Sign Up</h2>
        <div className="mb-6">
          <input
            name="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-400"
          />
        </div>
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
          Sign Up
        </button>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="w-full mt-4 py-3 bg-green-100 text-green-700 font-semibold rounded-lg hover:bg-green-200 transition duration-300"
        >
          Go to Login
        </button>
      </form>
    </div>
  );
}

export default Signup;
