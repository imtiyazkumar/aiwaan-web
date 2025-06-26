import { createBrowserRouter } from "react-router-dom";
import { AuthenticatedRoutes, UnAuthenticatedRoutes } from "../hooks/AuthHooks";
import { AppRoutes } from "./routes";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../Views/auth/SignIn";
import SignUp from "../Views/auth/SignUp";
import ResetPassword from "../Views/auth/ResetPassword";
import Services from "../Views/Services";
import ContactUs from "../Views/ContactUs";
import Faq from "../Views/Faq";
import PrivacyPolicy from "../Views/PrivacyPolicy";
import Projects from "../Views/Projects";
import MAsterLayout from "../layouts/MasterLayout";
import HomePage from "../Views/Home";
import About from "../Views/About";
import GetQuote from "../Views/GetQuote";
import AddEditProject from "../Views/AddEditProject";
import Billing from "../Views/Billing";

const router = createBrowserRouter([
    {
        children: [
            {
                path: "/",
                element: <UnAuthenticatedRoutes />,
                children: [
                    {
                        element: <MAsterLayout />,
                        children: [
                            {
                                path: AppRoutes.Auth,
                                element: <AuthLayout />,
                                children: [
                                    { path: AppRoutes.SignIn, element: <SignIn />, index: true },
                                    { path: AppRoutes.SignUp, element: <SignUp /> },
                                    { path: AppRoutes.ResetPassword, element: <ResetPassword /> },
                                ]
                            },
                            { path: AppRoutes.Servises, element: <Services /> },
                            { path: AppRoutes.Home, element: <HomePage />, index: true },

                            { path: AppRoutes.ContactUs, element: <ContactUs /> },
                            { path: AppRoutes.GetQuote, element: <GetQuote /> },
                            { path: AppRoutes.Faq, element: <Faq /> },
                            { path: AppRoutes.PrivacyPolicy, element: <PrivacyPolicy /> },
                            { path: AppRoutes.Projects, element: <Projects /> },
                            { path: AppRoutes.About, element: <About /> },
                            { path: AppRoutes.AddEditProject, element: <AddEditProject /> },
                            { path: AppRoutes.Billing, element: <Billing /> },
                        ]
                    }
                ],
            },


            {
                path: "/admin",
                element: <AuthenticatedRoutes />,
                children: [
                    {
                        element: <MAsterLayout />,
                        children: [
                            // Fixed: Using relative path without leading slash
                            { path: "projects", element: <Projects />, index: true },
                            // Or if AppRoutes.Projects needs to stay as is, use the path directly:
                            // { path: AppRoutes.Projects.replace("/", ""), element: <Projects />, index: true },

                            // Fix the same issue for Administration path if needed
                            { path: "administration", element: <SignUp /> },
                            { path: "add-project", element: <AddEditProject /> },

                            // Or if using AppRoutes:
                            // { path: AppRoutes.Administration.replace("/", ""), element: <SignUp /> },
                        ]
                    }
                ],
            },
            {
                path: AppRoutes.Error,
                element: <AuthLayout />,
                children: [
                    // { path: AppRoutes.Error404, element: <ErrorView code={ErrorCode.E403} /> },
                    // { path: AppRoutes.Error, element: <ErrorView code={ErrorCode.E500} /> },
                ],
            },
        ],
        // errorElement: <AuthLayout><ErrorView code={ErrorCode.E404} /></AuthLayout>,
    },
]);

export default router;
