const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(bodyParser.json()); // For JSON data
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/ecommerce', {})
.then(() => console.log('Database connected'))
.catch(err => console.error('Database connection error:', err));

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce API');
});

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

// Server Start
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
