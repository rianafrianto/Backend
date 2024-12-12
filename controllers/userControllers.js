const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usersModels');

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.json({ 
          success : true,
          message:"Login Successfully",
          token
         });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

const registerUser = async (req, res) => {
    const { username, password, email } = req.body;
  
    try {
      // Validasi
      if (!username || !password || !email) {
        return res.status(400).json({ error: 'Username, password, and email are required' });
      }
  
      // Check user exist
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }
  
      // Mengenkripsi password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create table
      const newUser = await User.create({
        username,
        password: hashedPassword,
        email
      });
  
      res.status(201).json({
        success : true,
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  };
  

module.exports = { loginUser, registerUser }