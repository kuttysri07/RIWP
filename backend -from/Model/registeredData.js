const mongoose = require('mongoose');

// Schema for dynamically storing field names and their values
const registeredDataSchema = new mongoose.Schema({
  values: [
    {
      name: String, // Field name (e.g., "email", "password")
      value: String, // Field value (e.g., the input provided by the user)
    },
  ],
}, { timestamps: true }); // Include timestamps for when the record was created

// Create a Mongoose model based on the schema
const RegisteredDataModel = mongoose.model('RegisteredData', registeredDataSchema);

module.exports = RegisteredDataModel;
