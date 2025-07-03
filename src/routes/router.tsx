import { createBrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import MasterLayout from "../layouts/MasterLayout";
import Services from "../Views/Services";
import HomePage from "../Views/Home";
import Faq from "../Views/Faq";
import PrivacyPolicy from "../Views/PrivacyPolicy";
import AdminProjects from "../Views/AdminProjects";
import Projects from "../Views/Projects";
import About from "../Views/About";
import AddEditProject from "../Views/AddEditProject";
import Billing from "../Views/Billing";
import SignIn from "../Views/SignIn";
import Contact from "../Views/Contact";


const router = createBrowserRouter([
    {
        children: [
            {
                element: <MasterLayout />,
                children: [
                    { path: AppRoutes.Servises, element: <Services /> },
                    { path: AppRoutes.Home, element: <HomePage /> },
                    { path: AppRoutes.Contact, element: <Contact /> },
                    { path: AppRoutes.GetQuote, element: <Contact /> },
                    { path: AppRoutes.Faq, element: <Faq /> },
                    { path: AppRoutes.PrivacyPolicy, element: <PrivacyPolicy /> },
                    { path: AppRoutes.Projects, element: <Projects /> },
                    { path: AppRoutes.AdminProjects, element: <AdminProjects /> },
                    { path: AppRoutes.About, element: <About /> },
                    { path: AppRoutes.AddEditProject, element: <AddEditProject /> },
                    { path: `${AppRoutes.AddEditProject}/:id`, element: <AddEditProject /> },
                    { path: AppRoutes.Billing, element: <Billing /> },
                    { path: AppRoutes.SignIn, element: <SignIn /> },

                ]
            }
        ],
    }
]);

export default router;
