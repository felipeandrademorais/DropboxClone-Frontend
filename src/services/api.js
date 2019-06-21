import axios from 'axios';

const api = axios.create({
    baseURL: '186.209.243.57:3000', 
});

export default api;