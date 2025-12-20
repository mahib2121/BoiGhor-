// import axios from 'axios';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router';
// import useAuth from '../Firebase/useAuth';

// // create ONE axios instance
// const axiosSecure = axios.create({
//     baseURL: 'http://localhost:3000',
//     withCredentials: true,
// });

// const useAxiosSecure = () => {
//     const { user, logOut } = useAuth();
//     const navigate = useNavigate();

//     useEffect(() => {
//         // REQUEST INTERCEPTOR
//         const reqInterceptor = axiosSecure.interceptors.request.use(
//             (config) => {
//                 if (user?.accessToken) {
//                     config.headers.authorization = `Bearer ${user.accessToken}`;
//                 }
//                 return config;
//             },
//             (error) => Promise.reject(error)
//         );

//         // RESPONSE INTERCEPTOR
//         const resInterceptor = axiosSecure.interceptors.response.use(
//             (response) => response,
//             async (error) => {
//                 const status = error?.response?.status;

//                 if (status === 401 || status === 403) {
//                     await logOut();
//                     navigate('/login', { replace: true });
//                 }
//                 return Promise.reject(error);
//             }
//         );

//         // CLEANUP
//         return () => {
//             axiosSecure.interceptors.request.eject(reqInterceptor);
//             axiosSecure.interceptors.response.eject(resInterceptor);
//         };
//     }, [user?.accessToken, logOut, navigate]);

//     return axiosSecure;
// };

// export default useAxiosSecure;


import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "../Firebase/useAuth";

const axiosSecure = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const reqInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                if (user?.accessToken) {
                    config.headers.authorization = `Bearer ${user.accessToken}`;
                }
                return config;
            }
        );

        const resInterceptor = axiosSecure.interceptors.response.use(
            (res) => res,
            async (error) => {
                const status = error?.response?.status;

                if (status === 401 || status === 403) {
                    await logoutUser();
                    navigate("/login", { replace: true });
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };
    }, [user?.accessToken, logoutUser, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
