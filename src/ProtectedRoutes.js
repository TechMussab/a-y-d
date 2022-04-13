import { Navigate, Outlet } from "react-router-dom";
import auth from "./HelperClasses/Auth";
import LoginForm from "./components/LoginForm";



function ProtectedRoutes  ({isAuth,setIsAuth}) {
    return auth.isAuthenticated() ? <Outlet /> : <LoginForm
        isAuth={isAuth}
        setIsAuth={setIsAuth}
    />;
};

export default ProtectedRoutes;