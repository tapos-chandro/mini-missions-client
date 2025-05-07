import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loading from "../components/Loading";
import useUserData from "../Hooks/useUserData";


const AdminRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const {userData} = useUserData();


    if (loading) {
        return <Loading></Loading>
    }

    if (user && userData.role === "admin") {
        return children
    }


    return <Navigate to="/login" state={{ from: location }} replace />;

};

export default AdminRoutes;