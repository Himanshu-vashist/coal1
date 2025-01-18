import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',  // Update to port 3000
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ...rest of your api configuration...
