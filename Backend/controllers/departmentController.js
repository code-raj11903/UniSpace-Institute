import Department from "../models/departmentModel.js";
import Resource from "../models/resourceModel.js";
import Institute from "../models/instituteModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

// Login department
 const loginDepartment = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the department by email
        const department = await Department.findOne({ email }).select("+password");

        // If department not found or password doesn't match
        if (!department || !(await bcrypt.compare(password, department.password))) {
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

// Logout department
const logoutDepartment = (req, res) => {
    try {
        // Clear the JWT cookie
        res.cookie("jwt", "", { maxAge: 1, httpOnly: true });
        res.status(200).json({ message: "Department logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in logoutDepartment: ", error.message);
    }
};
// Add resource
const addResource = async (req, res) => {
  try {
    const { type, description, price_per_day, image_url } = req.body;
    const departmentId = req.user.id; // Assuming you store user ID in req.user from middleware
    const instituteId = req.user.instituteId; // Ensure that institute ID is available

    if (!type || !description || !price_per_day) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newResource = new Resource({
      type,
      description,
      price_per_day,
      image_url,
      department_id: departmentId,
      institute_id: instituteId,
    });

    const savedResource = await newResource.save();

    await Institute.findByIdAndUpdate(instituteId, { $push: { resources: savedResource._id } });

    res.status(201).json(savedResource);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in addResource: ", error.message);
  }
};

// Update resource
const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedResource = await Resource.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedResource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json(updatedResource);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in updateResource: ", error.message);
  }
};

// Delete resource
const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedResource = await Resource.findByIdAndRemove(id);

    if (!deletedResource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    await Institute.findByIdAndUpdate(deletedResource.institute_id, { $pull: { resources: id } });

    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in deleteResource: ", error.message);
  }
};

// Get all resources for department
const getAllDepartmentResources = async (req, res) => {
  try {
    const departmentId = req.user.id; // Assuming you store user ID in req.user from middleware

    const resources = await Resource.find({ department_id: departmentId });

    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in getAllDepartmentResources: ", error.message);
  }
};

// Get order history
const getOrderHistory = async (req, res) => {
  try {
    const departmentId = req.user.id;

    const department = await Department.findById(departmentId).populate('orders');
    
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json(department.orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in getOrderHistory: ", error.message);
  }
};

// Update department profile
const updateDepartmentProfile = async (req, res) => {
  try {
    const departmentId = req.user.id;
    const { name, location, phone, password } = req.body;

    const updates = { name, location, phone };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    const updatedDepartment = await Department.findByIdAndUpdate(
      departmentId,
      updates,
      { new: true }
    );

    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in updateDepartmentProfile: ", error.message);
  }
};

export {
  loginDepartment,
  logoutDepartment,
  addResource,
  updateResource,
  deleteResource,
  getOrderHistory,
  updateDepartmentProfile,
  getAllDepartmentResources
};
