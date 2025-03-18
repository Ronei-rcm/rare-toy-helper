import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

export const userService = {
  async getUsers() {
    const response = await axios.get(`${API_URL}/usuarios`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  },

  async getUserById(id: string) {
    const response = await axios.get(`${API_URL}/usuarios/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  },

  async updateUser(id: string, data: any) {
    const response = await axios.put(`${API_URL}/usuarios/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  }
};
