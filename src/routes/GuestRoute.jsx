import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GuestRoute = ({ children }) => {
    const { state } = useAuth();

    if (state.isAuthenticated) {
        // Redirect based on role so they can't go back to login
        if (state.user?.role === 'ADMIN') return <Navigate to="/admin" replace />;
        if (state.user?.role === 'PROVIDER') return <Navigate to="/dashboard" replace />;
        return <Navigate to="/" replace />;
    }

    return children;
};

export default GuestRoute;