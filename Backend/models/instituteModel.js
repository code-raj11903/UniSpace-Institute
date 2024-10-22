import mongoose from "mongoose";
import validator from 'validator';
const phoneValidator = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

const InstituteSchema = new mongoose.Schema({
  name: { type: String, 
    required: [true, "Institute name is required"] 
  },
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    validate: [validator.isEmail, "Please provide a valid Email!"],
    unique: true 
  },
  password: {
    type: String,
    required: [true, "Please provide a Password!"],
    minLength: [8, "Password must contain at least 8 characters!"],
    select: false
  },
  location: { type: String, required: [true, "Location is required"] },
  phone: { 
    type: String, 
    required: [true, "Phone number is required"],
    validate: [phoneValidator, "Please provide a valid phone number (10 digits)!"] 
  },
  role: {
    type: String,
    default: 'institute'},
  departments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Department" }],
  resources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Institute = mongoose.model("Institute", InstituteSchema);
export default Institute;
