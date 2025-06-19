import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4005', // Verifique se essa URL está correta para seu backend
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
