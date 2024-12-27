import { useEffect } from "react";
import axios from 'axios';
import { api } from "../api";
import { useAuth } from "./useAuth";

const useAxios = () => {
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        // Add a request interceptor
        const requestIntercept = api.interceptors.request.use(
            (config) => {
                const authToken = auth?.token;
                if (authToken) {
                    config.headers.Authorization = `Bearer ${authToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Add a response interceptor
        const responseIntercept = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                console.log(error);

                if (error.response.status === 403 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    originalRequest.headers.Authorization = `Bearer ${auth?.token}`;
                    return axios(originalRequest);
                }

                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(requestIntercept);
            api.interceptors.response.eject(responseIntercept);
        }
    }, [auth, setAuth]);

    return { api };
};

export default useAxios;