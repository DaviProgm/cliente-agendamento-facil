import axios from 'axios';

const api = axios.create({
  baseURL: 'https://schedule-control-api.onrender.com', // Verifique se essa URL está correta para seu backend
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
