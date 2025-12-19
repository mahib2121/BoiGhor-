import useRole from "../hook/useRole";
import { Navigate } from "react-router";
import useAuth from "../Firebase/useAuth";

const LibrarianRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [role, roleLoading] = useRole();

    if (loading || roleLoading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (user && (role === "admin" || role === "librarian")) {
        return children;
    }

    return <Navigate to="/" replace />;
};

export default LibrarianRoute;
