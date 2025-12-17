export const wrapperBaseClass = "py-10 w-full justify-center items-center bg-white rounded-2xl my-2 md:my-4 lg:my-8 shadow-lg px-4 overflow-hidden"


export enum AppRoutes {
    Home = "/",
    Auth = "/auth",
    SignIn = "/auth/sign-in",
    SignUp = "/auth/sign-up",
    ResetPassword = "/auth/reset",
    RequestResetPassword = "/auth/request-reset",
    Profile = "/profile",
    Services = "/services",
    Projects = "/projects",
    AdminProjects = "/admin/projects",
    Contact = "/contact",
    GetQuote = "/get-quote",
    Faq = "/faq",
    PrivacyPolicy = "/privacy-policy",
    Error = "/error",
    Error404 = "/error/404",
    ErrorSessionExpired = "/error/session-expired",
    ErrorConnectionError = "/error/connection-error",
    Administration = "/admin",
    About = "/about",
    AddEditProject = "/add-edit-project",
    Billing = "/billing",
}

export const RouteDefinitions = [
    { key: AppRoutes.Home, label: "Home", showInTopbar: true },
    { key: AppRoutes.Services, label: "Services", showInTopbar: true },
    { key: AppRoutes.About, label: "About", showInTopbar: true },
    { key: AppRoutes.Projects, label: "Portfolio", showInTopbar: true },
    { key: AppRoutes.SignIn, label: "Sign In" },
    { key: AppRoutes.SignUp, label: "Sign Up" },
    { key: AppRoutes.ResetPassword, label: "Reset" },
    { key: AppRoutes.RequestResetPassword, label: "Request Reset Password" },
    { key: AppRoutes.Profile, label: "profile" },
    { key: AppRoutes.AdminProjects, label: "Admin Projects", isAdmin: true },
    { key: AppRoutes.Billing, label: "Billing", isAdmin: true },
    { key: AppRoutes.Faq, label: "faq" },
    { key: AppRoutes.PrivacyPolicy, label: "Privacy Policy" },
    { key: AppRoutes.Administration, label: "Administration", isAdmin: true },
];
