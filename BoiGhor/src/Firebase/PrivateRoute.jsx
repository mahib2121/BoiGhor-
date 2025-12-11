import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from './useAuth';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation()
    // Show loading spinner
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-xl"></span>
            </div>
        );
    }

    // Redirect if not logged in
    if (!user) {
        return <Navigate state={location.pathname} to="/login" replace />;
    }

    // Allow access to protected page
    return children;
};

export default PrivateRoute;