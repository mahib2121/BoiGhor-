import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../Firebase/useAuth';


const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        const reqInterceptor = axiosSecure.interceptors.request.use(config => {
            const token = localStorage.getItem('access-token');


            if (user?.accessToken) {
                config.headers.Authorization = `Bearer ${user.accessToken}`;
            }
            return config;
        }, (error) => Promise.reject(error));


        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        }, async (error) => {

            const status = error.response ? error.response.status : null;

            if (status === 401 || status === 403) {
                await logOut();
                navigate('/login');
            }
            return Promise.reject(error);
        });


        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        }

    }, [user, logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;