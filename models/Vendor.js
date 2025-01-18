import mongoose from 'mongoose';

const ServiceFactorSchema = new mongoose.Schema({
  name: String,
  value: mongoose.Schema.Types.Mixed,
});

const ServiceSchema = new mongoose.Schema({
  serviceType: String,
  factors: [ServiceFactorSchema],
});

const vendorSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  registrationNumber: {
    type: String,
    required: [true, 'Registration number is required'],
    unique: true
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  services: {
    type: [ServiceSchema],
    required: [true, 'At least one service is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Vendor', vendorSchema);