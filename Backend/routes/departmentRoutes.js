import express from "express";
import { loginDepartment, logoutDepartment, addResource, updateResource, deleteResource, getOrderHistory, updateDepartmentProfile } from "../controllers/departmentController.js";
import isAuthenticatedDepartment from "../middlewares/isAuthenticatedDepartment.js";

const router = express.Router();

// Department login
router.post("/login", loginDepartment);
router.get("/logout", logoutDepartment);

// Resource management (by department)
router.get("/resources", isAuthenticatedDepartment, getAllDepartmentResources);
router.post("/resources/add", isAuthenticatedDepartment, addResource);
router.put("/resources/update/:id", isAuthenticatedDepartment, updateResource);
router.delete("/resources/delete/:id", isAuthenticatedDepartment, deleteResource);

// Order history and profile management
router.get("/orders", isAuthenticatedDepartment, getOrderHistory);
router.put("/profile", isAuthenticatedDepartment, updateDepartmentProfile);

export default router;
