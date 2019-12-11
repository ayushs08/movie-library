import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/movie/';

export default axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: process.env.REACT_APP_API_KEY,
  },
});
