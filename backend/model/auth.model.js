import mongoose from "mongoose";

// Main Auth Schema
const AuthSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
}, {
  timestamps: true,
});

// Backup Schema for auditing or rollback purposes
const AuthSchemaBackupData = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
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
      originalId: this._id,
    });
  }
  next();
});

// Export main Auth model
const Auth = mongoose.model("Auth", AuthSchema);

export default Auth;
