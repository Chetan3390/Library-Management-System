import axios from 'axios';
import api from './api';

// This service contains functions for authentication-related API calls.

const BASE_URL = 'http://localhost:9091/auth';

const authService = {
  // Returns a JWT token
  login: (authRequest) => axios.post(`${BASE_URL}/authenticate`, authRequest),
  // Registers a new user
  register: (userInfo) => axios.post(`${BASE_URL}/new`, userInfo),
  // Returns roles
  getRoles: (username) => axios.get(`${BASE_URL}/getroles/${username}`),
  // Fetches user details (including userId) using the username
  getUserDetails: (username) => axios.get(`${BASE_URL}/user/${username}`),
};

export default authService;
