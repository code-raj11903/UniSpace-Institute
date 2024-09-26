import axios from 'axios';

const API_URL = 'http://localhost:4000/api';  // Replace with actual backend URL

// Institute login
export const loginInstitute = async (credentials) => {
  const response = await axios.post(`${API_URL}/v1/institute/login`, credentials);
  return response.data;
};

// Department login
export const loginDepartment = async (credentials) => {
  const response = await axios.post(`${API_URL}/v1/department/login`, credentials);
  return response.data;
};

// Register institute
export const registerInstitute = async (instituteData) => {
  const response = await axios.post(`${API_URL}/v1/institute/register`, instituteData);
  return response.data;
};
