import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

instance.interceptors.request.use(request => {
    const token = window.sessionStorage.getItem("Authorization");
    if(token) {
        request.headers.Authorization = 'Bearer ' + token;
    }
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

export default instance;