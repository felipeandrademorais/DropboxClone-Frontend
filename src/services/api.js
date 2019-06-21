import axios from 'axios';

const api = axios.create({
    baseURL: 'http://manualdeti.com.br:3000', 
});

export default api;