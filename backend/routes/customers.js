const express = require('express');
const { body } = require('express-validator');
const {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomersForExport
} = require('../controllers/customerController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Validation rules
const customerValidation = [
  body('fullName')
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters')
    .trim(),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('contactNumber')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid contact number'),
  body('dateOfBirth')
    .isISO8601()
    .withMessage('Please provide a valid date of birth')
    .custom((value) => {
      if (new Date(value) >= new Date()) {
        throw new Error('Date of birth must be in the past');
      }
      return true;
    }),
  body('state')
    .isLength({ min: 2, max: 50 })
    .withMessage('State must be between 2 and 50 characters')
    .trim(),
  body('city')
    .isLength({ min: 2, max: 50 })
    .withMessage('City must be between 2 and 50 characters')
    .trim()
];

// Get all customers
router.get('/', auth, getCustomers);

// Get customers for export
router.get('/export', auth, getCustomersForExport);

// Get customer by ID
router.get('/:id', auth, getCustomer);

// Create new customer
router.post('/', [
  auth,
  upload.single('profilePicture'),
  ...customerValidation
], createCustomer);

// Update customer
router.put('/:id', [
  auth,
  upload.single('profilePicture'),
  ...customerValidation
], updateCustomer);

// Delete customer (soft delete)
router.delete('/:id', auth, deleteCustomer);

module.exports = router;