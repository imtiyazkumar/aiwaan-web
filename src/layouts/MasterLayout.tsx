import { Div } from "../components/general/BaseComponents";
import Footer from "./fragments/Footer";
import TopBar from "./fragments/TopBar";
import { Outlet } from "react-router-dom";

const MAsterLayout: React.FC = () => {
    return (
        <Div className="md:ml-[250px] pb-14 md:pb-0 relative">
            <TopBar />
            <Div className="md:ml-[250px]">
                <Outlet />
            </Div>
            <Footer />
        </Div>

    );
};

export default MAsterLayout;    
