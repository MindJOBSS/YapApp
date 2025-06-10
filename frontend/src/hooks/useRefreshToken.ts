
import { authStore } from '../store/authStore';
import { axiosPrivate } from '../api/axios.config';

interface RefreshResponse {
    message: string;
    accessToken: string;
    user: {
        id: string;
        email: string;
        fullName: string;
    }
}

const useRefreshToken = () => {
    const setAuthData = authStore((state) => state.setAuthData);
    const axios = axiosPrivate;

    const getRefreshToken = async () => {
        try {
            const response = await axios.get<RefreshResponse>('/auth/refresh');
            setAuthData(response.data);
            return response.data.accessToken;
        } catch (error) {
            console.error('Error refreshing token:', error);
            setAuthData(null);
        }
    }

    return { getRefreshToken }
}

export { useRefreshToken }