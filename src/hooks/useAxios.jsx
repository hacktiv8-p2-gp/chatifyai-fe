import { useEffect } from "react";

import { useNavigate } from "react-router";
import axios from "../utils/axios";
import useAuthStore from "../data/AuthData";

const useAxios = () => {
  const { currentUser, clearUser } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      async (config) => {
        if (currentUser) {
          const token = await currentUser.getIdToken();

          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseIntercept = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          navigate("/login");
        }

        return Promise.reject(error);
      }
    );

    // Cleanup function to eject interceptors when component unmounts
    return () => {
      axios.interceptors.request.eject(requestIntercept);
      axios.interceptors.response.eject(responseIntercept);
    };
  }, [navigate]);

  return axios;
};

export default useAxios;
