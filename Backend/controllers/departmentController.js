import Department from "../models/departmentModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js"; // Make sure this utility is implemented

const loginDepartment = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the department by email
    const department = await Department.findOne({ email }).select("+password");

 
    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, department.password);
    if (!department ||!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate JWT token and set it as a cookie
    generateTokenAndSetCookie(department._id, res);

    // Send back the department data (without password)
    res.status(200).json({
      _id: department._id,
      name: department.name,
      email: department.email,
      location: department.location,
      phone: department.phone,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in loginDepartment: ", error.message);
  }
};
