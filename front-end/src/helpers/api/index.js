import axios from 'axios';

const api = axios.create({
  baseURL:
  // `http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}/` ||
  'http://localhost:3001',
});

export default api;
