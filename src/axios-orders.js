import axios from 'axios';

const instance = axios.create ( {
    baseURL: 'https://webshop-9a548.firebaseio.com/'
});

export default instance;