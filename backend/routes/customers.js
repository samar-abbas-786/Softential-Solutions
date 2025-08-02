const express = require("express");
const { body } = require("express-validator");
const {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomersForExport,
} = require("../controllers/customerController");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

const customerValidation = [
  body("fullName")
    .isLength({ min: 2, max: 100 })
    .withMessage("Full name must be between 2 and 100 characters")
    .trim(),
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("contactNumber")
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage("Please provide a valid contact number"),
  body("dateOfBirth")
    .isISO8601()
    .withMessage("Please provide a valid date of birth")
    .custom((value) => {
      if (new Date(value) >= new Date()) {
        throw new Error("Date of birth must be in the past");
      }
      return true;
    }),
  body("state")
    .isLength({ min: 2, max: 50 })
    .withMessage("State must be between 2 and 50 characters")
    .trim(),
  body("city")
    .isLength({ min: 2, max: 50 })
    .withMessage("City must be between 2 and 50 characters")
    .trim(),
];

router.get("/", auth, getCustomers);

router.get("/export", auth, getCustomersForExport);

router.get("/:id", auth, getCustomer);

router.post(
  "/",
  [auth, upload.single("profilePicture"), ...customerValidation],
  createCustomer
);

router.put(
  "/:id",
  [auth, upload.single("profilePicture"), ...customerValidation],
  updateCustomer
);

router.delete("/:id", auth, deleteCustomer);

module.exports = router;
