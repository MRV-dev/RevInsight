const Mechanic = require('../models/mechanic');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin creates mechanic account
const createMechanic = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phoneNumber, specialization, yearsOfExperience, certifications } = req.body;

    // Check if mechanic exists
    const existingMechanic = await Mechanic.findOne({ email });
    if (existingMechanic) {
      return res.status(400).json({ message: 'Mechanic email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create mechanic
    const mechanic = await Mechanic.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      specialization,
      yearsOfExperience,
      certifications: certifications || [],
      createdBy: req.user.id
    });

    res.status(201).json({
      message: 'Mechanic account created successfully',
      mechanic: {
        id: mechanic._id,
        email: mechanic.email,
        firstName: mechanic.firstName,
        lastName: mechanic.lastName,
        specialization: mechanic.specialization,
        yearsOfExperience: mechanic.yearsOfExperience
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mechanic login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find mechanic
    const mechanic = await Mechanic.findOne({ email }).select('+password');
    if (!mechanic) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, mechanic.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ userId: mechanic._id, role: 'mechanic' }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      mechanic: {
        id: mechanic._id,
        email: mechanic.email,
        firstName: mechanic.firstName,
        lastName: mechanic.lastName,
        specialization: mechanic.specialization
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get mechanic profile
const getProfile = async (req, res) => {
  try {
    const mechanic = await Mechanic.findById(req.user.userId);
    if (!mechanic) {
      return res.status(404).json({ message: 'Mechanic not found' });
    }

    res.status(200).json({
      mechanic: {
        id: mechanic._id,
        email: mechanic.email,
        firstName: mechanic.firstName,
        lastName: mechanic.lastName,
        phoneNumber: mechanic.phoneNumber,
        specialization: mechanic.specialization,
        yearsOfExperience: mechanic.yearsOfExperience,
        certifications: mechanic.certifications,
        totalRepairs: mechanic.totalRepairs,
        averageRating: mechanic.averageRating,
        isActive: mechanic.isActive
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update mechanic profile
const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, specialization, yearsOfExperience, certifications } = req.body;

    const mechanic = await Mechanic.findByIdAndUpdate(
      req.user.userId,
      {
        firstName,
        lastName,
        phoneNumber,
        specialization,
        yearsOfExperience,
        certifications
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: 'Profile updated successfully',
      mechanic: {
        id: mechanic._id,
        email: mechanic.email,
        firstName: mechanic.firstName,
        lastName: mechanic.lastName,
        specialization: mechanic.specialization,
        yearsOfExperience: mechanic.yearsOfExperience,
        certifications: mechanic.certifications
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMechanic,
  login,
  getProfile,
  updateProfile
};
