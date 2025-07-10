import mongoose from "mongoose";

import bcrypt from 'bcrypt';

// Main Auth Schema
const AuthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  cartItems: [
    {
      quantity: {
        type: Number,
        default: 1,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],
  role: {
    type: String,
    enum: ["costumer", "admin"],
    default: "costumer",
  },
  status: {
    type: String,
    enum: ['online', 'offline'],
    default: 'offline',
  },
  lastLogin: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});



AuthSchema.pre('save', async function(next) {
  if(!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

AuthSchema.methods.comparePassword = async function (password) {
	return bcrypt.compare(password, this.password);
};


// Backup Schema for auditing or rollback purposes
const AuthSchemaBackupData = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  originalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
  },
  backedUpAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Create model for backup
const BackupData = mongoose.model("BackupUser", AuthSchemaBackupData);

// Pre-save middleware to backup data on first creation
AuthSchema.pre("save", async function (next) {
  if (this.isNew) {
    await BackupData.create({
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      role: this.role,
      originalId: this._id,
    });
  }
  next();
});

// Export main Auth model
const Auth = mongoose.model("Auth", AuthSchema);

export default Auth;
