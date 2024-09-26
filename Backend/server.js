import express from "express";
import connectDB from "./database/connectDB.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cloudinary from "cloudinary";
import instituteRouter from "./routes/instituteRoutes.js";
import departmentRouter from "./routes/departmentRoutes.js";
import cors from 'cors';


dotenv.config();


// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// Institute routes
app.use("/api/v1/institute", instituteRouter);

// Department routes
app.use("/api/v1/department", departmentRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});