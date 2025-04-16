import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:8000/api',  // backend's URL
    withCredentials: true,                // Allow cookies to be sent (for JWT)
})

export default API