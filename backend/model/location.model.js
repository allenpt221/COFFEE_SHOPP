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


const Location = mongoose.model("location", locationSchema);

export default Location;