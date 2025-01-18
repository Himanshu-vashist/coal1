import Vendor from "../models/Vendor.js";

const createVendor = async (req, res) => {
  try {
    const { companyName, registrationNumber, address, services } = req.body;
    
    // Log the incoming data
    console.log('Received vendor data:', req.body);

    if (!companyName || !registrationNumber || !address || !services) {
      return res.status(400).json({ 
        message: "Missing required fields",
        received: req.body 
      });
    }

    // Transform services into correct format if needed
    const formattedServices = Array.isArray(services) 
      ? services.map(service => {
          if (typeof service === 'string') {
            return {
              serviceType: service,
              factors: []
            };
          }
          return service;
        })
      : [];

    const newVendor = new Vendor({
      companyName,
      registrationNumber,
      address,
      services: formattedServices,
    });

    // Log the vendor object before saving
    console.log('Attempting to save vendor:', newVendor);

    const savedVendor = await newVendor.save();
    console.log('Vendor saved successfully:', savedVendor);

    res.status(201).json({ 
      message: "Vendor registered successfully", 
      vendor: savedVendor 
    });
  } catch (error) {
    console.error("Detailed error:", error);
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: "Registration number already exists" 
      });
    }
    res.status(500).json({ 
      message: "Internal server error", 
      error: error.message,
      details: "Services must be an array of objects with serviceType and factors"
    });
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
