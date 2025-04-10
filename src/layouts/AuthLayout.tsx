import { Outlet } from "react-router-dom";
import { Div } from "../components/general/BaseComponents";

const AuthLayout: React.FC = () => {
    return (
        <Div className="flex flex-col h-full">
            <Outlet />
        </Div>

    );
};
export default AuthLayout;
