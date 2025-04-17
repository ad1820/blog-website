// import axios from 'axios'

// const API = axios.create({
//     baseURL: 'http://localhost:8000/api',  // backend's URL
//     withCredentials: true,                // Allow cookies to be sent (for JWT)
// })

// export default API


import axios from 'axios'

const API = axios.create({
    baseURL: 'https://blog-website-7vqa.onrender.com/api',  // Use the backend's Render URL
    withCredentials: true,                // Allow cookies to be sent (for JWT)
})

export default API
