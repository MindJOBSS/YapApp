
import { checkAuthStore } from '../store/checkAuthStore'
import { useEffect , useState} from 'react';
import { useAxiosPrivate } from './useAxiosPrivate';
import { authStore } from '../store/authStore';


const useCheckAuth = () => {
    const accessToken = authStore((state) => state.accessToken);
    const setIsAuthenticated = checkAuthStore((state) => state.setIsAuthenticated);
    const isAuthenticated = checkAuthStore((state) => state.isAuthenticated);
    const axiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axiosPrivate.get('/auth/check');
                if (response.status === 200) {
                    setIsAuthenticated(true);
                    setLoading(false);
                } else {
                    setIsAuthenticated(false);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error checking authentication status:', error);
                setIsAuthenticated(false);
                setLoading(false);
            }

        }
        if (accessToken) {
            checkAuthStatus();
        } else {
            setIsAuthenticated(false);
            setLoading(false);
        }
    }, [accessToken]);

    return { isAuthenticated, loading };
}

export { useCheckAuth }