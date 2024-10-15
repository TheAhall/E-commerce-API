//authController.js
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
        // Check if email exists
        let usermail = await User.findOne({  email  });
        if (usermail) {
            return res.status(400).json({ message: 'email already exists' });
        }

        // Check if username exists
        let usern = await User.findOne({  username  });
        if (usern) {
            return res.status(400).json({ message: 'username already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        user = new User({ name, username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login User
exports.login = async (req, res) => {
    const { LoginField, password } = req.body;
    try {
        // Check if user exists
        const user = await User.findOne({ 
            $or: [{ email: LoginField }, { username: LoginField }]
         });
         
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};