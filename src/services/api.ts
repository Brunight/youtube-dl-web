import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ADDRESS || 'http://localhost:3333',
});

export default api;
