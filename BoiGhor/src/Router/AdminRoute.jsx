import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Firebase/useAuth';
import useRole from '../hook/useRole';
import Loading from '../components/Loading';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();

    const [role, roleLoading] = useRole();
    const location = useLocation();


    if (loading || roleLoading) {
        return <Loading />;
    }


    if (user && role === 'admin') {
        return children;
    }


    return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export default AdminRoute;