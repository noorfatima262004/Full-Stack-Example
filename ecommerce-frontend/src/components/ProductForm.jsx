import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlinePlus, AiOutlineEdit } from 'react-icons/ai'; // Importing icons
import { FiArrowLeft } from 'react-icons/fi';

function ProductForm() {
  const [form, setForm] = useState({ name: '', price: '', description: '', category: '' });
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/products/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error(`Product not found (status: ${res.status})`);
          return res.json();
        })
        .then((data) => setForm(data))
        .catch(() => setError('Product not found or there was an error retrieving product details.'));
    }
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Client-side validation function
  const validateForm = () => {
    if (!form.name || !form.price || !form.description || !form.category) {
      return 'All fields are required';
    }
    if (form.price <= 0) {
      return 'Price must be a positive number';
    }
    return null; // No validation errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run client-side validation
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const method = id ? 'PUT' : 'POST';
    const endpoint = id ? `http://localhost:5000/products/${id}` : 'http://localhost:5000/products/add';

    // Reset error before sending request
    setError(null);

    await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    navigate('/products');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-green-700">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {id ? 'Edit Product' : 'Add Product'}
          </h2>
          <button onClick={() => navigate('/products')} className="text-gray-500 hover:text-gray-800">
            <FiArrowLeft className="text-2xl" />
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            value={form.name}
          />
          <input
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            name="price"
            placeholder="Price"
            type="number"
            onChange={handleChange}
            value={form.price}
          />
          <textarea
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            name="description"
            placeholder="Description"
            rows="4"
            onChange={handleChange}
            value={form.description}
          />
          <input
            className="w-full p-3 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            name="category"
            placeholder="Category"
            onChange={handleChange}
            value={form.category}
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition duration-300 flex items-center justify-center"
          >
            {id ? <AiOutlineEdit className="inline mr-4" /> : <AiOutlinePlus className="inline mr-4" />}
            {id ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
