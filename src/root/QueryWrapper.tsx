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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactChildren } from "../App.d";
import { DefaultQueryOptions } from "../utils/QueryDefaults.config";
import { useAuth } from "./providers/AuthProvider";
import { useToast } from "./providers/ToastProvider";

const QueryWrapper: React.FC<ReactChildren> = ({ children }) => {
    const auth = useAuth();
    const toast = useToast();

    const queryClient = new QueryClient({ defaultOptions: DefaultQueryOptions(auth.clearToken, toast) });

    return (
        <React.Fragment>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </React.Fragment>
    );
};

export default QueryWrapper;
