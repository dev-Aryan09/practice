import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

export default function useApi() {
  const { accessToken } = useAuthContext();
  const api = axios.create({
    baseURL: "http://localhost:5173",
    withCredentials: true,
  });

  api.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return api;
}
