import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-53fc6.firebaseio.com/',
});

export default instance;
