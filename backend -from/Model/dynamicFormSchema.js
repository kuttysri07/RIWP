const mongoose = require('mongoose');

const formFieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensure each field has a name
  },
  type: {
    type: String,
    required: true, // Ensure each field has a type (e.g., text, number, etc.)
    enum: ['text', 'number', 'date', 'email', 'password'], // Only allow these types
  },
});

const dynamicFormSchema = new mongoose.Schema({
  fields: [formFieldSchema], // Array of form fields
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp for when the form was created
  },
});

const DynamicForm = mongoose.model('DynamicForm', dynamicFormSchema);

module.exports = DynamicForm;
