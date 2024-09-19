import jwt from "jsonwebtoken";
import Institute from "../models/instituteModel.js";

// Middleware to check if the institute is authenticated
const isAuthenticatedInstitute = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "Not authorized, no token" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find the institute by the ID stored in the token
    const institute = await Institute.findById(decoded.userId);

    if (!institute) {
      return res.status(401).json({ error: "Not authorized, institute not found" });
    }

    // Attach the institute to the request object
    req.user = institute;
    next();
  } catch (error) {
    res.status(401).json({ error: "Not authorized, token failed" });
    console.log("Error in isAuthenticatedInstitute: ", error.message);
  }
};

export default isAuthenticatedInstitute ;
