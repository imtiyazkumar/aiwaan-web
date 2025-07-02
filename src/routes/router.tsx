import { createBrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import Services from "../views/Services";
import HomePage from "../views/Home";
import MasterLayout from "../layouts/MasterLayout";
import Contact from "../views/Contact";
import Faq from "../views/Faq";
import PrivacyPolicy from "../views/PrivacyPolicy";
import Projects from "../views/Projects";
import About from "../views/About";
import AddEditProject from "../views/AddEditProject";
import Billing from "../views/Billing";


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
                    { path: AppRoutes.About, element: <About /> },
                    { path: AppRoutes.AddEditProject, element: <AddEditProject /> },
                    { path: `${AppRoutes.AddEditProject}/:id`, element: <AddEditProject /> },
                    { path: AppRoutes.Billing, element: <Billing /> },
                ]
            }
        ],
    }
]);

export default router;
