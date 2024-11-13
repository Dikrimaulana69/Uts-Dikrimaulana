import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.118.58:3000', // Ubah dengan IPv4 komputer kamu
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
