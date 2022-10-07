import axios from "axios";

axios.defaults.data = {};
axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

/////////// Request API ///////////
const requestInstance = axios.create();
requestInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

requestInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.message === "cancel") return Promise.reject(error);

    return Promise.reject(error);
  }
);
export const resort = requestInstance;
export default requestInstance;
