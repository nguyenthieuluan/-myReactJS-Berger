import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://bando-186704.firebaseio.com/'
});

export default instance;
