import mongoose from "mongoose";

const ServiceFactorSchema = new mongoose.Schema({
  name: String,
  value: mongoose.Schema.Types.Mixed,
});

const ServiceSchema = new mongoose.Schema({
  serviceType: String,
  factors: [ServiceFactorSchema],
});

const VendorSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  address: { type: String, required: true },
  services: [ServiceSchema],
});

const Vendor = mongoose.model("Vendor", VendorSchema);
export default Vendor;