import React, { useState } from "react";
import "./App.css";

function App() {
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

    if (!/^[a-zA-Z\s]{3,}$/.test(formData.name)) newErrors.name = "Name must be at least 3 letters (A-Z only).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email address format.";
    if (!/^STU-\d{4}$/.test(formData.rollNo)) newErrors.rollNo = "Roll No must be format: STU-1234";
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) newErrors.mobile = "Mobile must be 10 digits (India format).";
    if (!/^\d{2}-\d{2}-\d{4}$/.test(formData.dob)) newErrors.dob = "Date must be DD-MM-YYYY.";
    if (!formData.gender) newErrors.gender = "Please select a gender.";
    if (formData.courses.length === 0) newErrors.courses = "Select at least one course.";
    if (!formData.mode) newErrors.mode = "Select a course mode.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Registration Successful for " + formData.name);
    } else {
      alert("Please fix the errors in the form.");
    }
  };

  return (
    <div className="container">
      <h2>🎓 Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          <span className="error">{errors.name}</span>
        </div>

        <div className="form-group">
          <label>Email ID:</label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
          <span className="error">{errors.email}</span>
        </div>

        <div className="form-group">
          <label>Roll No (STU-1234):</label>
          <input type="text" name="rollNo" placeholder="STU-XXXX" value={formData.rollNo} onChange={handleChange} />
          <span className="error">{errors.rollNo}</span>
        </div>

        <div className="form-group">
          <label>Mobile Number:</label>
          <input type="text" name="mobile" maxLength="10" value={formData.mobile} onChange={handleChange} />
          <span className="error">{errors.mobile}</span>
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input type="text" name="dob" placeholder="DD-MM-YYYY" value={formData.dob} onChange={handleChange} />
          <span className="error">{errors.dob}</span>
        </div>

        <div className="form-group">
          <label>Gender: </label>
          <input type="radio" name="gender" value="Male" onChange={handleChange} /> Male
          <input type="radio" name="gender" value="Female" onChange={handleChange} /> Female
          <br />
          <span className="error">{errors.gender}</span>
        </div>

        <div className="form-group">
          <label>Courses: </label>
          <input type="checkbox" name="courses" value="React" onChange={handleChange} /> React
          <input type="checkbox" name="courses" value="Java" onChange={handleChange} /> Java
          <input type="checkbox" name="courses" value="Python" onChange={handleChange} /> Python
          <br />
          <span className="error">{errors.courses}</span>
        </div>

        <div className="form-group">
          <label>Mode: </label>
          <select name="mode" onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
          <br />
          <span className="error">{errors.mode}</span>
        </div>

        <button type="submit">Register Student</button>
      </form>
    </div>
  );
}

export default App;