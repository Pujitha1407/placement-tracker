import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../App.css";   // ✅ global CSS

function AddStudentForm() {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    branch: "",
    cgpa: "",
    skills: "",
    email: "",
    phone: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/students", formData)
      .then(response => {
        console.log("Student added:", response.data);
        setFormData({ name: "", rollNumber: "", branch: "", cgpa: "", skills: "", email: "", phone: "" });
        navigate("/company");
      })
      .catch(error => console.error("Error adding student:", error));
  };

  return (
    <div className="container">
      
      <form onSubmit={handleSubmit}>
        <h3>Add New Student</h3>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="rollNumber" placeholder="Roll Number" value={formData.rollNumber} onChange={handleChange} required />
        <input type="text" name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} required />
        <input type="number" step="0.1" name="cgpa" placeholder="CGPA" value={formData.cgpa} onChange={handleChange} required />
        <input type="text" name="skills" placeholder="Skills" value={formData.skills} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudentForm;
