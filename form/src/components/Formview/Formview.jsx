import React, { useEffect, useState } from "react";
import axios from "axios";
import "./formview.css";

const DB_URL = process.env.REACT_APP_API_URL;

const Formview = () => {
  const [formFields, setFormFields] = useState([]);
  const [values, setValues] = useState({}); // Store form values as an object

  // Fetch form fields from the backend
  const getFormFields = () => {
    axios
      .get(`${DB_URL}getform`)
      .then((res) => {
        console.log(res.data);
        setFormFields(res.data[0]?.fields || []);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getFormFields();
  }, []);

  // Handle input value changes
  const handleInputChange = (e, fieldName) => {
    setValues({
      ...values,
      [fieldName]: e.target.value, // Dynamically set the field value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Log values to check the structure
    console.log("Form values: ", values);
  
    axios
      .post(`${DB_URL}formdata`, values) // Send the form data
      .then((res) => {
        console.log(res.data);
        alert("Form submitted successfully!");
      })
      .catch((err) => {
        console.error("Error submitting form:", err);
      });
  };
  

  return (
    <div className="form-container">
      <h1 className="form-title">Dynamic Form</h1>

      <form onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
          <div className="field-container" key={index}>
            <label className="field-label">{field.name}</label>
            <input
              type={field.type}
              placeholder={`Enter Your ${field.name}`}
              value={values[field.name] || ""} // Set input value dynamically
              onChange={(e) => handleInputChange(e, field.name)} // Handle input change
              className="field-input"
            />
          </div>
        ))}

        <button className="submit-button" type="submit">
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default Formview;
