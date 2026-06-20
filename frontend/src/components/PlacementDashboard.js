import React, { useEffect, useState } from "react";
import axios from "axios";
import AddPlacementForm from "./AddPlacementForm";
import "../App.css";

function PlacementDashboard() {
  const [placements, setPlacements] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    axios.get("http://localhost:8080/api/placements")
      .then(response => setPlacements(response.data))
      .catch(error => console.error("Error fetching placements:", error));
  }, []);

  const updateStatus = (id, newStatus) => {
    axios.put(`http://localhost:8080/api/placements/${id}/status`, { status: newStatus })
      .then(response => {
        setPlacements(placements.map(p => p.id === id ? response.data : p));
      })
      .catch(error => console.error("Error updating status:", error));
  };

  const handlePlacementAdded = (newPlacement) => {
    setPlacements([...placements, newPlacement]);
  };

  const filteredPlacements = filter === "All"
    ? placements
    : placements.filter(p => p.status === filter);

  const counts = {
    Applied: placements.filter(p => p.status === "Applied").length,
    Interviewed: placements.filter(p => p.status === "Interviewed").length,
    Selected: placements.filter(p => p.status === "Selected").length,
    Rejected: placements.filter(p => p.status === "Rejected").length,
  };

  const total = placements.length;
  const successRate = total > 0 ? ((counts.Selected / total) * 100).toFixed(1) : 0;

  // ✅ Company-wise summary
  const companySummary = placements.reduce((acc, record) => {
    const companyName = record.company?.name || "Unknown";
    if (!acc[companyName]) {
      acc[companyName] = { Applied: 0, Interviewed: 0, Selected: 0, Rejected: 0 };
    }
    acc[companyName][record.status] += 1;
    return acc;
  }, {});

  return (
    <div className="container">
      <h2>Placement Dashboard</h2>

      <AddPlacementForm onPlacementAdded={handlePlacementAdded} />

      <div style={{ marginBottom: "10px" }}>
        <label>Filter by Status: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interviewed">Interviewed</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <strong>Summary:</strong> 
        Applied: {counts.Applied} | 
        Interviewed: {counts.Interviewed} | 
        Selected: {counts.Selected} | 
        Rejected: {counts.Rejected}
      </div>

      <div style={{ marginBottom: "15px" }}>
        <strong>Placement Success Rate:</strong> {successRate}% ({counts.Selected} out of {total})
        <div style={{
          width: "100%",
          backgroundColor: "#ddd",
          borderRadius: "5px",
          marginTop: "5px"
        }}>
          <div style={{
            width: `${successRate}%`,
            backgroundColor: "#4caf50",
            height: "20px",
            borderRadius: "5px",
            textAlign: "center",
            color: "white",
            fontWeight: "bold"
          }}>
            {successRate}%
          </div>
        </div>
      </div>

      {/* ✅ Company-wise summary table */}
      <h3>Company-wise Summary</h3>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Applied</th>
            <th>Interviewed</th>
            <th>Selected</th>
            <th>Rejected</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(companySummary).map(([company, stats]) => (
            <tr key={company}>
              <td>{company}</td>
              <td>{stats.Applied}</td>
              <td>{stats.Interviewed}</td>
              <td>{stats.Selected}</td>
              <td>{stats.Rejected}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Main placement table */}
      <h3>All Placements</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student Details</th>
            <th>Company Details</th>
            <th>Job Role</th>
            <th>Package Offered</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlacements.map(record => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>
                {record.student?.name} ({record.student?.rollNumber})<br />
                {record.student?.branch} | CGPA: {record.student?.cgpa}<br />
                {record.student?.email} | {record.student?.phone}
              </td>
              <td>
                {record.company?.name}<br />
                {record.company?.industry} ({record.company?.location})<br />
                {record.company?.email} | {record.company?.phone}
              </td>
              <td>{record.jobRole}</td>
              <td>{record.packageOffered} LPA</td>
              <td>
                <select
                  value={record.status}
                  onChange={(e) => updateStatus(record.id, e.target.value)}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interviewed">Interviewed</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlacementDashboard;
