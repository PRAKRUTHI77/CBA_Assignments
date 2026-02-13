import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

// 🧠 HELPER: Look inside the browser's memory for our custom database
const getLocalUsers = () => {
  const saved = localStorage.getItem('my_fake_database');
  return saved ? JSON.parse(saved) : null;
};

// 🧠 HELPER: Save changes to the browser's memory
const saveLocalUsers = (users) => {
  localStorage.setItem('my_fake_database', JSON.stringify(users));
};

const userService = {
  getAllUsers: async () => {
    try {
      let users = getLocalUsers();
      // If we don't have a local database yet, fetch the 10 users from the internet and save them!
      if (!users) {
        const response = await axios.get(API_URL);
        users = response.data;
        saveLocalUsers(users);
      }
      return users;
    } catch (error) {
      throw new Error(error.message || 'Failed to load users');
    }
  },

  getUserById: async (id) => {
    try {
      const users = getLocalUsers() || [];
      const user = users.find(u => u.id.toString() === id.toString());
      if (user) return user;
      
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to load user');
    }
  },

  createUser: async (userData) => {
    try {
      // 1. We still ping the fake API to prove your Axios POST works for the assignment!
      await axios.post(API_URL, userData); 
      
      // 2. But we save it locally so it actually shows up on your screen
      const users = getLocalUsers() || [];
      const newUser = { ...userData, id: Date.now() }; // Give them a unique ID
      saveLocalUsers([newUser, ...users]); // Add the new user to the top of the list
      
      return newUser;
    } catch (error) {
      throw new Error(error.message || 'Failed to create user');
    }
  },

  updateUser: async (id, userData) => {
    try {
      // Axios PUT request
      await axios.put(`${API_URL}/${id}`, userData);
      
      // Update local memory
      const users = getLocalUsers() || [];
      const updatedUsers = users.map(u => u.id.toString() === id.toString() ? { ...u, ...userData } : u);
      saveLocalUsers(updatedUsers);
      
      return userData;
    } catch (error) {
      throw new Error(error.message || 'Failed to update user');
    }
  },

  deleteUser: async (id) => {
    try {
      // Axios DELETE request
      await axios.delete(`${API_URL}/${id}`);
      
      // Remove from local memory
      const users = getLocalUsers() || [];
      const remainingUsers = users.filter(u => u.id.toString() !== id.toString());
      saveLocalUsers(remainingUsers);
      
      return true;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete user');
    }
  }
};

export default userService;