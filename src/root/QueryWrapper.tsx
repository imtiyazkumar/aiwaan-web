import React from "react";
import { QueryClient, QueryClientProvider, type DefaultOptions } from "@tanstack/react-query";
import { useToast, type IToastContext } from "./providers/ToastProvider";
import type { ReactChildren } from "../../App.d";
import { useAuth } from "./providers/AuthProvider";

// import { ReactChildren } from "../App.d";
// import { DefaultQueryOptions } from "../utils/QueryDefaults.config";

export const DefaultQueryOptions = (clearFunction: VoidFunction, toast: IToastContext): DefaultOptions<Error> | undefined => ({
    queries: {
        throwOnError: (error: Error) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore-error
            if (error.apiStatus == 401) clearFunction();
            // Defer toast error to next event loop cycle to avoid setState during render
            setTimeout(() => {
                toast.error(error.message);
            }, 0);
            return false;
        },
        // staleTime: 10000,
    },
    mutations: {
        onError: (error: Error) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore-error
            if (error.apiStatus == 401) clearFunction();
            // Defer toast error to next event loop cycle to avoid setState during render
            setTimeout(() => {
                toast.error(error.message);
            }, 0);
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
