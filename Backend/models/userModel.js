import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"]
  },
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
    unique: true
  },
  phone: {
    type: String, 
    required: [true, "Please enter your Phone Number!"]
  },
  password: {
    type: String,
    required: [true, "Please provide a Password!"],
    minLength: [8, "Password must contain at least 8 characters!"],
    select: false,
    validate: {
      validator: function (value) {
        // Regular expression for password validation
        // At least one uppercase letter, one lowercase letter, one number, and one special character
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,32}$/.test(value);
      },
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!"
    }
  },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);
export default User;
