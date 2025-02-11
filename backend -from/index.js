const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const mongoose = require("mongoose");
const path = require("path");
const DynamicForm = require('./Model/dynamicFormSchema');
const RegisteredDataModel = require("./Model/registeredData");

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.dburl)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


  app.post('/forms', async (req, res) => {
    try {
      const { fields } = req.body; // Extract fields from request body
  
      // Create a new dynamic form document
      const newForm = new DynamicForm({ fields });
  
      // Save the form to the database
      await newForm.save();
  
      res.status(201).json({ message: 'Form saved successfully!' });
    } catch (error) {
      console.error('Error saving form:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.get('/getform', async (req, res) => {
    try {
      // Await the result of the find operation
      const formFields = await DynamicForm.find(); 
    
      res.status(200).json(formFields); // Send the result with a 200 status code
    } catch (error) {
      console.error('Error fetching form fields:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.post('/formdata', async (req, res) => {
    try {
      const values = req.body; // Extract fields from request body
      
      // Create a new dynamic form document
      const newForm = new RegisteredDataModel(values);
      
      // Save the form to the database
      await newForm.save();
      
      res.status(201).json({ message: 'Form saved successfully!' });
    } catch (error) {
      console.error('Error saving form:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

// Serve frontend
app.use(express.static(path.join(__dirname, "../RIC/build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../RIC/build/index.html"));
    
});


// Start the server
app.listen(8000, () => {
  console.log("Server running on port 8000");
});
