import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // URL of your Express.js server
});

export default {
  getAllItems() {
    return apiClient.get('/items');
  },
  getItem(id) {
    return apiClient.get(`/items/${id}`);
  },
  createItem(item) {
    return apiClient.post('/items', item);
  },
  updateItem(id, item) {
    return apiClient.put(`/items/${id}`, item);
  },
  deleteItem(id) {
    return apiClient.delete(`/items/${id}`);
  },
}