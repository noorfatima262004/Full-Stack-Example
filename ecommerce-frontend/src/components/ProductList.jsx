import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from 'react-icons/ai';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleDeleteProducts = async () => {
    for (let productId of selectedProducts) {
      await fetch(`http://localhost:5000/products/${productId}`, {
        method: 'DELETE',
      });
    }
    setProducts(products.filter((product) => !selectedProducts.includes(product._id)));
    setSelectedProducts([]);
    setIsDeleteMode(false);
  };

  const handleEditProduct = () => {
    if (selectedProducts.length === 1) {
      navigate(`/products/edit/${selectedProducts[0]}`);
    } else {
      alert('Please select a single product to edit.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-700 p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Product List</h2>
        {products.map((product) => (
          <div
            key={product._id}
            className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm flex items-center justify-between"
          >
            <div className="flex-grow">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-green-700 font-bold">Price: ${product.price}</p>
            </div>
            {(isDeleteMode || isEditMode) && (
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(product._id)}
                checked={selectedProducts.includes(product._id)}
                className="ml-4 w-4 h-4"
              />
            )}
          </div>
        ))}

        <div className="flex gap-4 mt-6 justify-center">
          <button
            onClick={() => setIsDeleteMode(!isDeleteMode)}
            className={`py-2 px-4 rounded hover:bg-red-600 flex items-center ${
              isDeleteMode ? 'bg-red-500' : 'bg-gray-300'
            } text-white`}
          >
            <AiFillDelete className="mr-2" />
            {isDeleteMode ? 'Cancel Delete' : 'Delete'}
          </button>

          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`py-2 px-4 rounded hover:bg-blue-600 flex items-center ${
              isEditMode ? 'bg-blue-500' : 'bg-gray-300'
            } text-white`}
          >
            <AiFillEdit className="mr-2" />
            {isEditMode ? 'Cancel Edit' : 'Edit'}
          </button>

          <button
            onClick={() => navigate('/products/new')}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 flex items-center"
          >
            <AiOutlinePlus className="mr-2" />
            Add New Product
          </button>
        </div>

        {isDeleteMode && (
          <button
            onClick={handleDeleteProducts}
            disabled={selectedProducts.length === 0}
            className="mt-4 bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 w-full"
          >
            Confirm Delete
          </button>
        )}

        {isEditMode && (
          <button
            onClick={handleEditProduct}
            disabled={selectedProducts.length !== 1}
            className="mt-4 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 w-full"
          >
            Confirm Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductList;
