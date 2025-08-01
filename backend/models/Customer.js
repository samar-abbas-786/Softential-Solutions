const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
      match: [/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid contact number"],
    },
    dateOfBirth: {
      type: Date,
      required: true,
      validate: {
        validator: function (date) {
          return date < new Date();
        },
        message: "Date of birth must be in the past",
      },
    },
    profilePicture: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better search performance
customerSchema.index({
  fullName: "text",
  email: "text",
  contactNumber: "text",
});
customerSchema.index({ state: 1, city: 1 });
customerSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Customer", customerSchema);
