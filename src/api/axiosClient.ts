import axios, { type AxiosInstance } from "axios";

const client: AxiosInstance = axios.create({
  baseURL: "https://dog.ceo/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
