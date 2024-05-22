import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { jwtSecret } from '../config.js';


export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    console.log(`Registering user: ${username}, ${email}`);
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log('Email already in use');
      return res.status(400).json({ message: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });
    console.log('User registered successfully:', newUser);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });
    console.log("token:");
    console.log(token);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};
