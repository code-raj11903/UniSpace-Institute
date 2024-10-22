import mongoose from "mongoose";
import validator from 'validator';

const phoneValidator = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Department name is required"] },
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    validate: [validator.isEmail, "Please provide a valid Email!"],
    unique: true 
  },
  location: { type: String, required: [true, "Location is required"] },
  phone: {
    type: String, 
    required: [true, "Please enter your Phone Number!"],
    validate: [phoneValidator, "Please provide a valid phone number (10 digits)!"] 
  },
  password: {
    type: String,
    required: [true, "Please provide a Password!"],
    minLength: [8, "Password must contain at least 8 characters!"],
    select: false
  },
  role: {
    type: String,
    default: 'department' },
  institute_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: [true, "Institute reference is required"] },
  resources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Department = mongoose.model('Department', DepartmentSchema);
export default Department;
