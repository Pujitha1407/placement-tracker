import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../App.css";   // ✅ corrected path

function AddCompanyForm() {
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    location: "",
    email: "",
    phone: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/companies", formData)
      .then(response => {
        console.log("Company added:", response.data);
        setFormData({ name: "", industry: "", location: "", email: "", phone: "" });
        navigate("/dashboard"); // ✅ go to dashboard after success
      })
      .catch(error => console.error("Error adding company:", error));
  };

  return (
    <div className="container">
      
      <form onSubmit={handleSubmit}>
        <h3>Add New Company</h3>
        <input type="text" name="name" placeholder="Company Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="industry" placeholder="Industry" value={formData.industry} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <button type="submit">Add Company</button>
      </form>
    </div>
  );
}

export default AddCompanyForm;
