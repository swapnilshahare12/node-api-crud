const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true, 
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
    primaryEmergencyContactDetails: [{
      primaryEmergencyContact:{
    type: String,
    required: true,
  },
  primaryEmergencyPhoneNumber: {
    type: Number,
    require: true,
  },
  relationship1: {
    type: String,
    require: true,
  },
  }],
    secondaryEmergencyContactDetails: [{
     secondaryEmergencyContact:{
    type: String,
    require: true,
  },
  secondaryEmergencyPhoneNumber: {
    type: Number,
    require: true,
    },
    relationship2: {
      type:String
  }
  }]
});

const employee = new mongoose.model('employee', employeeSchema);

module.exports = employee;
