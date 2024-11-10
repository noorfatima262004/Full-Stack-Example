const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'], // Make name required
        trim: true, // Trims leading/trailing spaces
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'], // Make price required
        min: [0, 'Price must be a positive number'], // Ensure price is a positive number
    },
    description: {
        type: String,
        required: [true, 'Product description is required'], // Make description required
    },
    category: {
        type: String,
        required: [true, 'Product category is required'], // Make category required
    },
});

module.exports = mongoose.model('Product', ProductSchema);
