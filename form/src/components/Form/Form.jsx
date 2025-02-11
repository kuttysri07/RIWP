import React, { useState } from "react";
import axios from "axios";
import "./form.css"

const DB_URL = process.env.REACT_APP_API_URL;

const DynamicForm = () => {
  const [formFields, setFormFields] = useState([]); // Store all dynamic fields
  const [newFieldName, setNewFieldName] = useState(""); // Store new field name input
  const [newFieldType, setNewFieldType] = useState("text"); // Store new field type (default: text)

  // Function to add a new field
  const addField = () => {
    setFormFields([...formFields, { name: newFieldName, type: newFieldType }]);
    setNewFieldName(""); // Reset after adding
  };

  // Function to delete a field by index
  const deleteHandler = (indexToDelete) => {
    setFormFields(formFields.filter((_, index) => index !== indexToDelete));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${DB_URL}forms`, { fields: formFields }); // Send fields to backend
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h1>Create Dynamic Form</h1>
      
      {/* Add New Field Section */}
      <div>
        <input
          type="text"
          placeholder="Field Name"
          value={newFieldName}
          onChange={(e) => setNewFieldName(e.target.value)}
        />
        <select
          value={newFieldType}
          onChange={(e) => setNewFieldType(e.target.value)}
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
          <option value="email">Email</option>
          <option value="password">Password</option>
        </select>
        <button onClick={addField}>+ Add Field</button>
      </div>

      {/* Display dynamically added fields */}
      <form onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
          <div key={index}> 
            <label>{field.name}</label>
            <input type={field.type} name={field.name} />
            <button type="button" onClick={() => deleteHandler(index)}>Delete</button>
          </div>
        ))}

        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
};

export default DynamicForm;
