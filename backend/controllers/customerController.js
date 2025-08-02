const { validationResult } = require("express-validator");
const Customer = require("../models/Customer");
const fs = require("fs");
const path = require("path");

const getCustomers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      state = "",
      city = "",
    } = req.query;

    let query = { isActive: true };

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { contactNumber: { $regex: search, $options: "i" } },
      ];
    }

    if (state) {
      query.state = { $regex: state, $options: "i" };
    }

    if (city) {
      query.city = { $regex: city, $options: "i" };
    }

    const customers = await Customer.find(query)
      .populate("createdBy", "username")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Customer.countDocuments(query);

    res.json({
      customers,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error("Get customers error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate(
      "createdBy",
      "username"
    );

    if (!customer || !customer.isActive) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(customer);
  } catch (error) {
    console.error("Get customer error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const createCustomer = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const customerData = {
      ...req.body,
      createdBy: req.user._id,
    };

    if (req.file) {
      customerData.profilePicture = `/uploads/profiles/${req.file.filename}`;
    }

    const customer = new Customer(customerData);
    await customer.save();

    const populatedCustomer = await Customer.findById(customer._id).populate(
      "createdBy",
      "username"
    );

    res.status(201).json(populatedCustomer);
  } catch (error) {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }

    console.error("Create customer error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const customer = await Customer.findById(req.params.id);
    if (!customer || !customer.isActive) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (req.file && customer.profilePicture) {
      const oldImagePath = path.join(__dirname, "..", customer.profilePicture);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error("Error deleting old image:", err);
      });
    }

    const updateData = { ...req.body };
    if (req.file) {
      updateData.profilePicture = `/uploads/profiles/${req.file.filename}`;
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate("createdBy", "username");

    res.json(updatedCustomer);
  } catch (error) {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }

    console.error("Update customer error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer || !customer.isActive) {
      return res.status(404).json({ message: "Customer not found" });
    }

    customer.isActive = false;
    await customer.save();

    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Delete customer error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getCustomersForExport = async (req, res) => {
  try {
    const { search = "", state = "", city = "" } = req.query;

    let query = { isActive: true };

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { contactNumber: { $regex: search, $options: "i" } },
      ];
    }

    if (state) {
      query.state = { $regex: state, $options: "i" };
    }

    if (city) {
      query.city = { $regex: city, $options: "i" };
    }

    const customers = await Customer.find(query)
      .populate("createdBy", "username")
      .sort({ createdAt: -1 })
      .select("fullName email contactNumber dateOfBirth state city createdAt");

    res.json(customers);
  } catch (error) {
    console.error("Get customers for export error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomersForExport,
};
