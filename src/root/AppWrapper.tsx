/**
 * Project Ouma Health
 *
 * @author      Moin Khan
 * @copyright   Teleperinatal, Inc.
 *
 * Built by Eonyx Infotech LLP.
 * @link https://eonyx.io
 *
 */

import React from "react";

import { ReactChildren } from "../App.d";
import { initializeAxios } from "./services/axiosService";
import AuthProvider from "./providers/AuthProvider";
import ToastProvider from "./providers/ToastProvider";
import QueryWrapper from "./QueryWrapper";

initializeAxios();

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
