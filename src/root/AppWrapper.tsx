import React from "react";

// import { ReactChildren } from "../App.d";
// import { initializeAxios } from "./services/axiosService";
import ToastProvider from "./providers/ToastProvider";
import QueryWrapper from "./QueryWrapper";
import AuthProvider from "./providers/AuthProvider";
import type { ReactChildren } from "../../App.d";

// initializeAxios();

const AppWrapper: React.FC<ReactChildren> = ({ children }) => {
    return (
        <React.Fragment>
            <ToastProvider>
                <AuthProvider>
                    <QueryWrapper>
                        {children}
                    </QueryWrapper>
                </AuthProvider>
            </ToastProvider>
        </React.Fragment>
    );
};

export default AppWrapper;
