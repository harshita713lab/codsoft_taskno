import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getProjects = async () => {
    const response = await axios.get(`${API_URL}/projects/all`);
    return response.data;
};

export const addProject = async (projectData) => {
    const response = await axios.post(`${API_URL}/projects/add`, projectData);
    return response.data;
};

// 🗑️ Delete ka function
export const deleteProject = async (id) => {
    const response = await axios.delete(`${API_URL}/projects/${id}`);
    return response.data;
};

// ✏️ Edit ka function
export const updateProject = async (id, updatedData) => {
    const response = await axios.put(`${API_URL}/projects/${id}`, updatedData);
    return response.data;
};