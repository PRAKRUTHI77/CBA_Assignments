import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// --- 1. The Home Page Component ---
function Home() {
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h1>🏫 University Portal</h1>
      <p>Welcome to the Student Admission System.</p>
      <Link to="/register">
        <button style={{ marginTop: "20px" }}>Go to Registration Form</button>
      </Link>
    </div>
  );
}

// --- 2. The Registration Form Component ---
function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "Banan Developer",
    email: "banan@example.com",
    rollNo: "",
    mobile: "",
    dob: "",
    gender: "",
    mode: "",
    courses: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      let updatedCourses = [...formData.courses];
      if (checked) {
        updatedCourses.push(value);
      } else {
        updatedCourses = updatedCourses.filter((course) => course !== value);
      }
      setFormData({ ...formData, courses: updatedCourses });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!/^[a-zA-Z\s]{3,}$/.test(formData.name)) newErrors.name = "Name must be 3+ letters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email.";
    if (!/^STU-\d{4}$/.test(formData.rollNo)) newErrors.rollNo = "Format: STU-1234";
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) newErrors.mobile = "Invalid Mobile No.";
    if (!/^\d{2}-\d{2}-\d{4}$/.test(formData.dob)) newErrors.dob = "Format: DD-MM-YYYY";
    if (!formData.gender) newErrors.gender = "Select gender.";
    if (formData.courses.length === 0) newErrors.courses = "Select a course.";
    if (!formData.mode) newErrors.mode = "Select mode.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Registration Successful for " + formData.name);
    } else {
      alert("Please fix errors.");
    }
  };

  return (
    <div className="container">
      <Link to="/" style={{ textDecoration: "none", color: "#666" }}>⬅ Back to Home</Link>
      <h2>🎓 Student Registration</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Name */}
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          <span className="error">{errors.name}</span>
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email:</label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
          <span className="error">{errors.email}</span>
        </div>

        {/* Roll No */}
        <div className="form-group">
          <label>Roll No:</label>
          <input type="text" name="rollNo" placeholder="STU-1234" value={formData.rollNo} onChange={handleChange} />
          <span className="error">{errors.rollNo}</span>
        </div>

        {/* Mobile */}
        <div className="form-group">
          <label>Mobile:</label>
          <input type="text" name="mobile" maxLength="10" value={formData.mobile} onChange={handleChange} />
          <span className="error">{errors.mobile}</span>
        </div>

        {/* DOB */}
        <div className="form-group">
          <label>DOB (DD-MM-YYYY):</label>
          <input type="text" name="dob" placeholder="DD-MM-YYYY" value={formData.dob} onChange={handleChange} />
          <span className="error">{errors.dob}</span>
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>Gender: </label>
          <input type="radio" name="gender" value="Male" onChange={handleChange} /> Male
          <input type="radio" name="gender" value="Female" onChange={handleChange} /> Female
          <br /><span className="error">{errors.gender}</span>
        </div>

        {/* Courses */}
        <div className="form-group">
          <label>Courses: </label>
          <input type="checkbox" name="courses" value="React" onChange={handleChange} /> React
          <input type="checkbox" name="courses" value="Java" onChange={handleChange} /> Java
          <br /><span className="error">{errors.courses}</span>
        </div>

        {/* Mode */}
        <div className="form-group">
          <label>Mode: </label>
          <select name="mode" onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
          <br /><span className="error">{errors.mode}</span>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

// --- 3. The Main App Component (Routing Logic) ---
function App() {
  return (
    <Router>
      <Routes>
        {/* This defines the links */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
}

export default App;