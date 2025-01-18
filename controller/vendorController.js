import Vendor from "../models/Vendor.js";

const createVendor = async (req, res) => {
  try {
    const { companyName, registrationNumber, address, services } = req.body;
    const newVendor = new Vendor({
      companyName,
      registrationNumber,
      address,
      services,
    });
    await newVendor.save();
    res.status(201).json({ message: "Vendor registered successfully", vendor: newVendor });
  } catch (error) {
    console.error("Error creating vendor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    console.error("Error fetching vendors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getVendorById = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findById(id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.status(200).json(vendor);
  } catch (error) {
    console.error("Error fetching vendor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteVendor = async (req, res) => {
  try {
    const { id } = req.params;
    await Vendor.findByIdAndDelete(id);
    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    console.error("Error deleting vendor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createVendor, getVendors, getVendorById, deleteVendor };
