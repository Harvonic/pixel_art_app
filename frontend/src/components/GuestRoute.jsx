import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function GuestRoute({ children }){
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (user) {
        return <Navigate to="/feed" replace/>;
    }

    return children;
}

export default GuestRoute;