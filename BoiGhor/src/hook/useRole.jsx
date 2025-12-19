import { useQuery } from '@tanstack/react-query';
import useAuth from '../Firebase/useAuth';
import useAxiosSecure from './axiosSecure';

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role, isLoading } = useQuery({

        queryKey: ['role', user?.email],


        enabled: !!user?.email && !loading,

        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data.role;
        }
    });

    return [role, isLoading];
};

export default useRole;