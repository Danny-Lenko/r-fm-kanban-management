import axios from 'axios';

export const instance = axios.create({
   baseURL: process.env.REACT_APP_API_BASE_URL,
});

// import axios from './axios-instance'; // Import the Axios instance

export const setAuthHeader = (token: string | null) => {
   if (token) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
   } else {
      delete instance.defaults.headers.common['Authorization'];
   }
};

export default instance;
