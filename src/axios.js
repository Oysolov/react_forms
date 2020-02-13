import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-forms-4a6f0.firebaseio.com/'
});

export default instance;