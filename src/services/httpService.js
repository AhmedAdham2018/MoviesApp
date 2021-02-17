import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";
import apiUrl from '../config.json';



//axios.defaults.headers.post["x-auth-token"] = getJwtToken();
//axios.defaults.baseURL = apiUrl;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/*axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
*/

// Add a response interceptor
axios.interceptors.response.use(null,function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
    const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError){
    logger.log(error);
    toast.error("An unexpected error occurrred!");
  }
  return Promise.reject(error);
});

function setJwtToken(jwt) {
  const instance = axios.create({
      baseURL: apiUrl
    });

  instance.defaults.headers.common['x-auth-token'] = jwt;
}



export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwtToken
};
