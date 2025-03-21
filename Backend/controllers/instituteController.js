import Institute from "../models/instituteModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import { v2 as cloudinary } from "cloudinary";
import Department from "../models/departmentModel.js";
import Resource from "../models/resourceModel.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js"
import mongoose from 'mongoose';
const registerInstitute = async (req, res) => {
  try {
    const { name, email, password, location, phone } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password || !location || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the institute already exists
    const existingInstitute = await Institute.findOne({ email });
    if (existingInstitute) {
      return res.status(400).json({ message: "Institute already exists with this email" });
    }

    // // Hash the password
    const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new institute
    const newInstitute = new Institute({
      name,
      email,
      password:hashedPassword,
      location,
      phone,
      role: 'institute'
    });
    await newInstitute.save();
    // Respond with success
    if (newInstitute) {
       const token = generateTokenAndSetCookie(newInstitute._id, res);

        res.status(201).json({
           token : token,
           user: {
            _id: newInstitute._id,
            name: newInstitute.name,
            email: newInstitute.email,
            location: newInstitute.location,
            phone: newInstitute.phone,
            role: newInstitute.role
           }  
          });
    } else {
        res.status(400).json({ error: "Invalid Institute data" });
    }
  }
  catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in registerInstitute: ", err.message);
}
};
const loginInstitute = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the institute by email
      const institute = await Institute.findOne({ email }).select("+password");
      console.log(institute);
      console.log(password);
      console.log(institute.password)
      // Compare passwords
      const isPasswordCorrect = await bcrypt.compare(password, institute.password);
      console.log(isPasswordCorrect);
      if (!institute || !isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
  
      // Generate JWT token and set it as a cookie
      const token  = generateTokenAndSetCookie(institute._id, res);
  
      // Send back the institute data (without password)
      res.status(200).json({
        token : token,
        user: {
          _id: institute._id,
          name: institute.name,
          email: institute.email,
          location: institute.location,
          phone: institute.phone,
          role: institute.role
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log("Error in loginInstitute: ", error.message);
    }
  };

const logoutInstitute = (req, res) => {
  try {
    // Clear the JWT cookie
    res.cookie("jwt", "", { maxAge: 1, httpOnly: true });
    res.status(200).json({ message: "Institute logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in logoutInstitute: ", error.message);
  }
};
const getAllDepartments = async (req, res) => {
  try {
    const instituteId = req.user.id; // Assuming you store user ID in req.user from middleware
    const departments = await Department.find({ institute_id: instituteId });
    console.log(departments);
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in getAllDepartments: ", error.message);
  }
}
// Add Department
const addDepartment = async (req, res) => {
    try {
        const { name, email, location, phone, password } = req.body;
        const instituteId = req.user.id; // Assuming you store user ID in req.user from middleware

        if (!name || !email || !location || !phone || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newDepartment = new Department({
            name,
            email,
            location,
            phone,
            password: hashedPassword,
            institute_id: instituteId,
            role: 'department'
        });

        const savedDepartment = await newDepartment.save();

        await Institute.findByIdAndUpdate(instituteId, { $push: { departments: savedDepartment._id } });

        res.status(201).json(savedDepartment);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in addDepartment: ", error.message);
    }
};

// Delete Department
const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const instituteId = req.user.id;

        const department = await Department.findOne({ _id: id, institute_id: instituteId });
        if (!department) return res.status(404).json({ message: "Department not found" });

        await Department.deleteOne({ _id: id, institute_id: instituteId });
        await Institute.findByIdAndUpdate(instituteId, { $pull: { departments: id } });

        res.status(200).json({ message: "Department deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in deleteDepartment: ", error.message);
    }
};

// Get All Resources
const getAllInstituteResources = async (req, res) => {
    try {
        const instituteId = req.user.id;
        const resources = await Resource.find({ institute_id: instituteId });
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in getAllInstituteResources: ", error.message);
    }
};
// Add a new resource
const addResource = async (req, res) => {
    try {
        const { name, location, type, description, price_per_day, image_url } = req.body;
        const instituteId = req.user.id;
        
        // Validate input fields
        if (!name || !location || !type || !description || !price_per_day || !image_url) {
            return res.status(400).json({ error: "All fields are required" });
        }

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
            institute_id: instituteId,
            image_url: uploadedImageUrl,
        });

        const savedResource = await newResource.save();

        // Update the Institute model to reference this resource
        await Institute.findByIdAndUpdate(instituteId, { $push: { resources: savedResource._id } });

        res.status(201).json(savedResource);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in addResource:", error.message);
    }
};

  
  // Update a resource

  // updating the data in booking list is remaining
  const updateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, type, description, price_per_day, image_url,availability } = req.body;

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
        const instituteId = req.user.id;

        const resource = await Resource.findOne({ _id: id, institute_id: instituteId });
        if (!resource) return res.status(404).json({ message: "Resource not found" });

        // Delete the image from Cloudinary if it exists
        if (resource.image_url) {
            const public_id = resource.image_url.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(public_id);
        }

        await Resource.deleteOne({ _id: id, institute_id: instituteId });
        await Institute.findByIdAndUpdate(instituteId, { $pull: { resources: id } });

        res.status(200).json({ message: "Resource deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in deleteResource:", error.message);
    }
};
const getOrderHistory = async (req, res) => {
  try {
    const instituteId = req.user.id;

    // Find the institute and populate orders with user and resource details
    const institute = await Institute.findById(instituteId)
      .populate({
        path: 'orders',
        populate: [
          { path: 'user_id', select: 'name email mobile address' }, // Populate user details
          { path: 'resource_ids', select: 'name type description price_per_day image_url' }, // Populate resource details
        ]
      });

    if (!institute) {
      return res.status(404).json({ message: "Institute not found" });
    }

    // Determine order status (confirmed or expired) and sort them
    const currentDate = new Date();

    const sortedOrders = institute.orders
      .map(order => ({
        ...order._doc, // Spread to handle Mongoose document structure
        status: new Date(order.end_date) < currentDate ? 'Expired' : order.status, // Update status
      }))
      .sort((a, b) => {
        // Sort by status: confirmed first
        if (a.status !== b.status) {
          return a.status === 'Confirmed' ? -1 : 1;
        }

        // Sort by start_date (ascending)
        const startDateDiff = new Date(a.start_date) - new Date(b.start_date);
        if (startDateDiff !== 0) {
          return startDateDiff;
        }

        // If start_date is the same, sort by end_date (descending)
        return new Date(b.end_date) - new Date(a.end_date);
      });

    res.status(200).json(sortedOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in getOrderHistory: ", error.message);
  }
};

// Update Institute Profile
const updateInstituteProfile = async (req, res) => {
    try {
        const instituteId = req.user.id; // Assuming `req.user.id` comes from authentication middleware
        const { name, location, phone, currentPassword, newPassword } = req.body;

        // Find the institute by ID
        const institute = await Institute.findById(instituteId).select("+password");

        // If institute is not found
        if (!institute) {
            return res.status(404).json({ error: "Institute not found" });
        }

        // If the current password and new password are provided, update the password
        if (currentPassword && newPassword) {
            // Check if the current password matches
            const isPasswordCorrect = await bcrypt.compare(currentPassword, institute.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ error: "Current password is incorrect" });
            }

            // Hash the new password before saving it
            const salt = await bcrypt.genSalt(10);
            const hashedNewPassword = await bcrypt.hash(newPassword, salt);

            // Update the password
            institute.password = hashedNewPassword;
        }

        // Update other profile fields
        institute.name = name || institute.name;
        institute.location = location || institute.location;
        institute.phone = phone || institute.phone;

        // Save the updated institute profile
        await institute.save();

        // Return the updated profile (excluding the password)
        res.status(200).json({
          _id: institute._id,
          name: institute.name,
          email: institute.email,
          location: institute.location,
          phone: institute.phone,
          role: institute.role
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in updateInstituteProfile: ", error.message);
    }
};
const getInstituteDashboardData = async (req, res) => {
  try {
    const instituteId = req.user.id;

    // Step 1: Find the institute and populate orders and resources
    const institute = await Institute.findById(instituteId)
      .populate('departments')
      .populate('orders')  // This will populate the orders array with order data
      .populate('resources');

    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }

    // Step 2: Calculate total number of departments and resources
    const totalDepartments = institute.departments.length;
    const totalResources = institute.resources.length;

    // Step 3: If orders are populated, calculate the total revenue and any stats
    const totalRevenue = institute.orders.reduce((acc, order) => acc + order.total_amount, 0);

    // Step 4: Perform aggregation on the `orders` array for stats
    const orderStats = await Order.aggregate([
      { $match: { _id: { $in: institute.orders.map(order => order._id) } } }, // Match only orders for this institute
      {
        $group: {
          _id: { $month: '$date' },  // Group by the month of the order date
          totalOrders: { $sum: 1 },
        },
      },
    ]);

    // Step 5: Perform aggregation on the `resources` array for stats
    const resourceStats = await Resource.aggregate([
      { $match: { _id: { $in: institute.resources.map(resource => resource._id) } } }, // Match only resources for this institute
      {
        $group: {
          _id: { $month: '$createdAt' },  // Group by the month of resource creation
          totalResources: { $sum: 1 },
        },
      },
    ]);

    // Step 6: Return the aggregated data as JSON
    res.status(200).json({
      totalDepartments,
      totalResources,
      totalRevenue,
      orderStats,
      resourceStats,
    });
  } catch (error) {
    console.error('Error in getInstituteDashboardData:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};


export {
    registerInstitute,
    loginInstitute,
    logoutInstitute,
    getAllDepartments,
    addDepartment,
    deleteDepartment,
    getAllInstituteResources,
    addResource,
    updateResource,
    deleteResource,
    updateInstituteProfile, getInstituteDashboardData,
    getOrderHistory
};