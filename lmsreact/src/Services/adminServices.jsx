import api from './api';

// This service contains functions for admin-related API calls.

const ADMIN_BASE_URL = 'http://localhost:9091/auth'; 

const adminService = {
  // This method fetches all user details from the backend.
  getAllUsers: () => api.get(`${ADMIN_BASE_URL}/users`)
};

export default adminService;
