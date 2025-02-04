import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: `http://localhost:3000`,
};

const amoApi = axios.create(config);

export { amoApi };
