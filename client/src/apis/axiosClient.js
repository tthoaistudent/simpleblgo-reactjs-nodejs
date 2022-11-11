import axios from 'axios';

// set up http request
const axiosClient = axios.create({
    baseUrl: process.env.REACT_APP_API_URL,
    headers:{
        'Content-Type':'application/json'
    }
})


axiosClient.interceptors.request.use(async (request) => {
    const token = localStorage.getItem('token');
    if(token){
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
})

axiosClient.interceptors.response.use(response => {
    if(response && response.data){
        return response.data;
    }
    return response;
},(error)=>{
    throw error;
})

export default axiosClient;