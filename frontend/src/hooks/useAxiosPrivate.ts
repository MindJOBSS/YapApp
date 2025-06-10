import { useEffect } from 'react';
import { useRefreshToken } from './useRefreshToken';
import { axiosPrivate } from '../api/axios.config';
import { authStore } from '../store/authStore';

const useAxiosPrivate = () => {
    const { getRefreshToken } = useRefreshToken()
    const accessToken = authStore((state) => state.accessToken);
    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                config.headers = config.headers || {};
                if (!config.headers["Authorization"] ) {
                    config.headers["Authorization"] = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await getRefreshToken();
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        )
        return () => {
          axiosPrivate.interceptors.request.eject(requestIntercept);
          axiosPrivate.interceptors.response.eject(responseIntercept);
        };

    }, [accessToken, getRefreshToken]);
    
    return axiosPrivate;
}

export { useAxiosPrivate }