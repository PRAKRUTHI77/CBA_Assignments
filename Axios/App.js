import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [employees, setEmployees] = useState([]);

  // The Fake API URL
  const API_URL = "https://jsonplaceholder.typicode.com/users"; 

  // --- 1️⃣ GET: Load Data (Component Loads) ---
  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setEmployees(response.data);
      })
      .catch(err => console.error(err));
  }, []);

  // --- 2️⃣ POST: Add Data (Click "Add Employee") ---
  const addEmployee = () => {
    const newName = prompt("Enter a name for the new employee:");
    if (!newName) return; // Stop if they didn't type a name

    const newUser = { name: newName, email: "new@example.com" };

    axios.post(API_URL, newUser)
      .then(response => {
        // The fake API returns ID 11. We create a new object to show it on screen.
        const userWithId = { ...newUser, id: employees.length + 11 }; 
        setEmployees([userWithId, ...employees]); // Add to TOP of list
        alert("Employee Added Successfully!");
      })
      .catch(err => alert("Error adding employee"));
  };

  // --- 3️⃣ DELETE: Remove Data (Click "Delete") ---
  const deleteEmployee = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(response => {
        // Filter out the deleted item from the screen
        setEmployees(employees.filter(emp => emp.id !== id));
        alert("Employee Deleted!");
      })
      .catch(err => alert("Error deleting employee"));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "600px", margin: "0 auto" }}>
      <h1>🔹 Axios Assignment Demo</h1>
      
      {/* The ADD Button */}
      <button 
        onClick={addEmployee} 
        style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer", marginBottom: "20px" }}
      >
        + Add New Employee (POST)
      </button>

      {/* The List */}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {employees.map(user => (
          <li key={user.id} style={{ borderBottom: "1px solid #ddd", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            
            {/* User Info */}
            <span>
              <strong>{user.name}</strong> <br/> 
              <span style={{color: "gray", fontSize: "12px"}}>{user.email}</span>
            </span>

            {/* The DELETE Button */}
            <button 
              onClick={() => deleteEmployee(user.id)}
              style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none", cursor: "pointer" }}
            >
              Delete (DELETE)
            </button>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;