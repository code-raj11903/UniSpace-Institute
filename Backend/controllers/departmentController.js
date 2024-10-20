import Department from "../models/departmentModel.js";
import Resource from "../models/resourceModel.js";
import Institute from "../models/instituteModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import { v2 as cloudinary } from "cloudinary";

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
        const token = generateTokenAndSetCookie(department._id, res);

        // Send back the department data (without password)
        res.status(200).json({
          token: token,
          user : {
            _id: department._id,
            name: department.name,
            email: department.email,
            location: department.location,
            phone: department.phone,
            role:   department.role
          }
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
// Add department Resource
const addResource = async (req, res) => {
  try {
    const { name, location, type, description, price_per_day, image_url } = req.body;
    const departmentId = req.user.id; // Get the department ID from auth middleware

    // Validate input fields
    if (!name || !location || !type || !description || !price_per_day || !image_url) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find the department to get the associated institute ID
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    const instituteId = department.institute_id; // Get the associated institute ID

    // Upload the image to Cloudinary
    const uploadedResponse = await cloudinary.uploader.upload(image_url);
    const uploadedImageUrl = uploadedResponse.secure_url;

    // Create and save the new resource
    const newResource = new Resource({
      name,
      location,
      type,
      description,
      price_per_day,
      department_id: departmentId,
      institute_id: instituteId, // Add the associated institute ID
      image_url: uploadedImageUrl,
    });

    const savedResource = await newResource.save();

    // Update the Department model to reference this resource
    await Department.findByIdAndUpdate(departmentId, { $push: { resources: savedResource._id } });

    // Update the Institute model to reference this resource
    await Institute.findByIdAndUpdate(instituteId, { $push: { resources: savedResource._id } });

    res.status(201).json(savedResource);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in addResource:", error.message);
  }
};


// Update a resource
const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, type, description, price_per_day, image_url, availability } = req.body;

    // Find the existing resource
    const resource = await Resource.findById(id);
    if (!resource) return res.status(404).json({ error: "Resource not found" });

    // If a new image is provided, replace the old image in Cloudinary
    let updatedImageUrl = resource.image_url;
    if (image_url) {
      if (resource.image_url) {
        const public_id = resource.image_url.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(public_id);  // Delete the old image
      }

      const uploadedResponse = await cloudinary.uploader.upload(image_url);
      updatedImageUrl = uploadedResponse.secure_url;
    }

    // Update the resource with new data
    resource.name = name || resource.name;
    resource.location = location || resource.location;
    resource.type = type || resource.type;
    resource.description = description || resource.description;
    resource.price_per_day = price_per_day || resource.price_per_day;
    resource.image_url = updatedImageUrl;
    resource.availability = availability;

    const updatedResource = await resource.save();
    res.status(200).json(updatedResource);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in updateResource:", error.message);
  }
};

// Delete a resource
const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    const departmentId = req.user.id; // Get the department ID from auth middleware
    const instituteId = departmentId.institute_id;
    const resource = await Resource.findOne({ _id: id, department_id: departmentId });
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    // Delete the image from Cloudinary if it exists
    if (resource.image_url) {
      const public_id = resource.image_url.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(public_id);
    }

    
    await Resource.deleteOne({ _id: id, department_id: departmentId });
    
    await Department.findByIdAndUpdate(departmentId, { $pull: { resources: id } });
    await Institute.findByIdAndUpdate(instituteId, { $pull: { resources: id } });

    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in deleteResource:", error.message);
  }
};
// Get all resources for department
const getAllDepartmentResources = async (req, res) => {
  try {
    const departmentId = req.user.id; // Assuming this comes from the middleware
    const resources = await Resource.find({ department_id: departmentId });
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in getAllDepartmentResources:", error.message);
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
    const departmentId = req.user.id; // Assuming department ID comes from authentication middleware
    const { name, location, phone, currentPassword, newPassword } = req.body;

    // Find the department by ID
    const department = await Department.findById(departmentId).select("+password");

    // If department is not found
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    // If the current password and new password are provided, update the password
    if (currentPassword && newPassword) {
      // Check if the current password matches
      const isPasswordCorrect = await bcrypt.compare(currentPassword, department.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }

      // Hash the new password before saving it
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);

      // Update the password
      department.password = hashedNewPassword;
    }

    // Update other profile fields
    department.name = name || department.name;
    department.location = location || department.location;
    department.phone = phone || department.phone;

    // Save the updated department profile
    await department.save();

    // Return the updated profile (excluding the password)
    res.status(200).json({
      _id: department._id,
      name: department.name,
      email: department.email,
      location: department.location,
      phone: department.phone,
      role:   department.role
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in updateDepartmentProfile: ", error.message);
  }
};


export {
  loginDepartment,
  logoutDepartment,
  getAllDepartmentResources,
  addResource,
  updateResource,
  deleteResource,
  getOrderHistory,
  updateDepartmentProfile
  
};
