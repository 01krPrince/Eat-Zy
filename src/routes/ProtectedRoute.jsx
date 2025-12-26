// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//     const { state } = useAuth();
//     const location = useLocation();

//     return state.isAuthenticated ? (
//         children
//     ) : (
//         <Navigate to="/login" state={{ from: location }} replace />
//     );
// };

// export default ProtectedRoute;

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// src/routes/ProtectedRoute.jsx
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { state } = useAuth();
    const location = useLocation();

    if (!state.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // state.user.role will now be 'CUSTOMER' or 'PROVIDER' based on the fix in Step 1
    if (allowedRoles && !allowedRoles.includes(state.user?.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;