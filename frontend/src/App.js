import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddStudentForm from "./components/AddStudentForm";
import AddCompanyForm from "./components/AddCompanyForm";
import PlacementDashboard from "./components/PlacementDashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <h1>Smart Placement Tracker</h1>
        <Routes>
          {/* Step 1: Student Form */}
          <Route path="/" element={<AddStudentForm />} />

          {/* Step 2: Company Form */}
          <Route path="/company" element={<AddCompanyForm />} />

          {/* Step 3: Dashboard */}
          <Route path="/dashboard" element={<PlacementDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
