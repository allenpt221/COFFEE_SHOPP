import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    emailAddress: {
      type: String,
      required: [true, "email is required"]
    },
    firstname: {
      type: String,
      required: [true, "first name is required"]
    },
    lastname: {
      type: String,
      required: [true, "last name is required"]
    },
    phoneNumber: {
      type: String, // ✅ Use String instead of Number to preserve leading 0
      required: [true, "phone number is required"]
    },
    houseNumber: {
      type: String,
      required: [true, "house number is required"]
    },
    town: {
      type: String,
      required: [true, "town is required"]
    },
    barangay: {
      type: String,
      required: [true, "barangay is required"]
    }
  },
  { timestamps: true }
);


const locationBackupSchema = new mongoose.Schema(
  {
    originalLocationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    emailAddress: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    phoneNumber: { type: String },
    houseNumber: { type: String },
    town: { type: String },
    barangay: { type: String },
    backedUpAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const locationBackUp = mongoose.model("locationBackUp", locationBackupSchema);

locationSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      await locationBackUp.create({
        originalLocationId: this._id,
        user: this.user,
        emailAddress: this.emailAddress,
        firstname: this.firstname,
        lastname: this.lastname,
        phoneNumber: this.phoneNumber,
        houseNumber: this.houseNumber,
        town: this.town,
        barangay: this.barangay,
      });
    } catch (err) {
      console.error("Location Backup failed:", err);
    }
  }
  next();
});

const Location = mongoose.model("location", locationSchema);

export default Location;