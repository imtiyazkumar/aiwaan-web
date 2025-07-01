// /**
//  * Project Ouma Health
//  *
//  * @author      Moin Khan
//  * @copyright   Teleperinatal, Inc.
//  *
//  * Built by Eonyx Infotech LLP.
//  * @link https://eonyx.io
//  *
//  */

// import React from "react";

// import { ReactChildren } from "../../App";
// import { initializeAxios } from "./services/axiosService";


// initializeAxios();

// const AppWrapper: React.FC<ReactChildren> = ({ children }) => {
//     return (
//         <React.Fragment>

//             <QueryWrapper>
//                 {children}
//             </QueryWrapper>

//         </React.Fragment>
//     );
// };

// export default AppWrapper;


import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactChildren } from "../../App.d";

const AppWrapper: React.FC<ReactChildren> = ({ children }) => {

    const queryClient = new QueryClient();

    return (
        <React.Fragment>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </React.Fragment>
    );
};

export default AppWrapper;
