import React from "react";
import { Div, FlexColumn } from "../components/general/BaseComponents";
import Footer from "./fragments/Footer";
import TopBar from "./fragments/TopBar";
import { Outlet } from "react-router-dom";

const MasterLayout: React.FC = () => {
    return (
        <FlexColumn className="min-h-screen w-full bg-neutral-50">
            <TopBar />
            <Div className="flex-grow w-full max-w-[1200px] mx-auto px-2">
                <Outlet />
            </Div>
            <Footer />
        </FlexColumn>
    );
};

export default MasterLayout;
