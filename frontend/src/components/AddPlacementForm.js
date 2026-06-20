import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";   // ✅ corrected path


function AddPlacementForm({ onPlacementAdded }) {
  const [formData, setFormData] = useState({
    jobRole: "",
    packageOffered: "",
    status: "Applied",
    studentId: "",
    companyId: ""
  });

  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/students")
      .then(response => setStudents(response.data))
      .catch(error => console.error("Error fetching students:", error));

    axios.get("http://localhost:8080/api/companies")
      .then(response => setCompanies(response.data))
      .catch(error => console.error("Error fetching companies:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/placements", {
      jobRole: formData.jobRole,
      packageOffered: parseFloat(formData.packageOffered),
      status: formData.status,
      student: { id: parseInt(formData.studentId) },
      company: { id: parseInt(formData.companyId) }
    })
    .then(response => {
      onPlacementAdded(response.data);
      setFormData({ jobRole: "", packageOffered: "", status: "Applied", studentId: "", companyId: "" });
    })
    .catch(error => console.error("Error adding placement:", error));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h3>Add New Placement</h3>
        <input type="text" name="jobRole" placeholder="Job Role" value={formData.jobRole} onChange={handleChange} required />
        <input type="number" name="packageOffered" placeholder="Package Offered (LPA)" value={formData.packageOffered} onChange={handleChange} required />

        <select name="studentId" value={formData.studentId} onChange={handleChange} required>
          <option value="">Select Student</option>
          {students.map(s => (
            <option key={s.id} value={s.id}>{s.name} ({s.rollNumber})</option>
          ))}
        </select>

        <select name="companyId" value={formData.companyId} onChange={handleChange} required>
          <option value="">Select Company</option>
          {companies.map(c => (
            <option key={c.id} value={c.id}>{c.name} - {c.industry}</option>
          ))}
        </select>

        <button type="submit">Add Placement</button>
      </form>
    </div>
  );
}

export default AddPlacementForm;
