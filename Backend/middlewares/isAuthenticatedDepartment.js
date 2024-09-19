import jwt from "jsonwebtoken";
import Department from "../models/departmentModel.js";

// Middleware to check if the department is authenticated
const isAuthenticatedDepartment = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "Not authorized, no token" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find the department by the ID stored in the token
    const department = await Department.findById(decoded.userId);

    if (!department) {
      return res.status(401).json({ error: "Not authorized, department not found" });
    }

    // Attach the department to the request object
    req.user = department;
    next();
  } catch (error) {
    res.status(401).json({ error: "Not authorized, token failed" });
    console.log("Error in isAuthenticatedDepartment: ", error.message);
  }
};

export default isAuthenticatedDepartment;
