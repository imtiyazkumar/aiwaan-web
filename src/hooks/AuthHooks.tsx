import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppRoutes } from "../routes/routes";
import { useAuth } from "../root/providers/AuthProvider";
import { IRouteState } from "../../App";

export const AuthenticatedRoutes = () => {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.token) return <Navigate to={AppRoutes.SignIn} state={{ prev: location }} replace />;

    return <Outlet />;
};

export const UnAuthenticatedRoutes = () => {
    const auth = useAuth();
    const location = useLocation();
    const from = (location.state as IRouteState)?.prev?.pathname || null;

    if (auth.token) return <Navigate to={from || AppRoutes.Home} replace />;

    return <Outlet />;
};
