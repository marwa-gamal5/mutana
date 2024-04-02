
import axios from 'axios';

let token = localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: 'http://192.168.11.100:8015',
    headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json"
    }
});




export default axiosInstance;
