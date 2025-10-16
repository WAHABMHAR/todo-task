// import { Navigate } from "react-router-dom";

// const ProtectedRoutes = ({ children }) => {
//     const user = localStorage.getItem("user");

//     if (!user) {
//         <Navigate to="/login" replace />;
//     } else if (user) {
//         <Navigate to="/" replace />;
//     }

//     return children;
// };

// export default ProtectedRoutes;

import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
    const user = localStorage.getItem("user");

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoutes;
