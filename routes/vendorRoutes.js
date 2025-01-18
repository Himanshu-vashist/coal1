import express from "express";
import { createVendor, getVendors, getVendorById, deleteVendor } from "../controller/vendorController.js";

const router = express.Router();

router.post("/vendors", createVendor);
router.get("/vendors", getVendors);
router.get("/vendors/:id", getVendorById);
router.delete("/vendors/:id", deleteVendor);

export default router;
