import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useCreator from "../hooks/useCreator";
import { Navigate, useLocation } from "react-router-dom";


const CreatorRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isCreator, isCreatorLoading] = useCreator();
    const location = useLocation();

    if (loading || isCreatorLoading) {
        return <div className="flex min-h-screen justify-center items-center"><progress className="progress w-56"></progress></div>
    }

    if (user && isCreator) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};


export default CreatorRoutes;