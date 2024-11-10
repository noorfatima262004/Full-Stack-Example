// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();



router.get('/', (req, res) => {
    res.send('Welcome to the auth page');
}
);
// Signup
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    // Log the request body to verify if it is being parsed correctly
    console.log('Request body:', req.body);
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' });}
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', user });
});

module.exports = router;
