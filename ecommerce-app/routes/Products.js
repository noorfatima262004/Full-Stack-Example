const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Validation function to check required fields
const validateProductFields = (product) => {
    const { name, price, description, category } = product;
    if (!name || !price || !description || !category) {
        return 'All fields (name, price, description, category) are required';
    }
    if (price <= 0) {
        return 'Price must be a positive number';
    }
    return null; // No errors
};

// Create Product
router.post('/add', async (req, res) => {
    const error = validateProductFields(req.body);
    if (error) {
        return res.status(400).json({ message: error });
    }

    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation failed', errors: error.errors });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Update Product
router.put('/:id', async (req, res) => {
    const error = validateProductFields(req.body);
    if (error) {
        return res.status(400).json({ message: error });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true, // Ensure Mongoose validation rules are applied
        });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation failed', errors: error.errors });
        }
        res.status(500).json({ message: 'Error updating product' });
    }
});

// Get All Products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
});

// Get Product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching product' });
    }
});

// Delete Product
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
});

module.exports = router;
