
import React from "react";
import { DefaultOptions, QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import { ReactChildren } from "../App.d";
// import { DefaultQueryOptions } from "../utils/QueryDefaults.config";
import { useAuth } from "./providers/AuthProvider";
import { IToastContext, useToast } from "./providers/ToastProvider";
import { ReactChildren } from "../../App";

export const DefaultQueryOptions = (clearFunction: VoidFunction, toast: IToastContext): DefaultOptions<Error> | undefined => ({
    queries: {
        throwOnError: (error: Error) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore-error
            if (error.apiStatus == 401) clearFunction();
            toast.error(error.message);
            return false;
        },
        // staleTime: 10000,
    },
    mutations: {
        onError: (error: Error) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore-error
            if (error.apiStatus == 401) clearFunction();
            toast.error(error.message);
            console.log(error);
        },
    },
});
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
