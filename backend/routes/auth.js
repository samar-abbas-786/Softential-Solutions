const express = require('express');
const { body } = require('express-validator');
const { login, getMe, changePassword } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// Login route
router.post('/login', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], login);

// Get current user
router.get('/me', auth, getMe);

// Change password
router.put('/change-password', [
  auth,
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
], changePassword);

module.exports = router;