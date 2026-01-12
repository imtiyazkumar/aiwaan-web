import type { IProject } from "~/components/cards/ProjectCard";

export const wrapperBaseClass = "w-full gap-2.5 md:gap-0 bg-white rounded-2xl shadow-lg overflow-hidden px-4 sm:px-6 lg:px-10 py-4 sm:py-8 lg:py-10 my-2 sm:my-4 lg:my-8 flex flex-col items-center justify-center"


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
    { key: AppRoutes.AdminProjects, label: "Admin Projects" },
    { key: AppRoutes.Billing, label: "Billing" },
    { key: AppRoutes.Faq, label: "faq" },
    { key: AppRoutes.PrivacyPolicy, label: "Privacy Policy" },
    { key: AppRoutes.Administration, label: "Admin Panel", isAdmin: true },
];

export const ourServices = [
    {
        title: "3D Architectural Visualization",
        description:
            "Transform blueprints into photorealistic 3D renders that help clients visualize the final build before construction begins.",
        imageUrl:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop&q=80",
        index: 1,
        tag: "FEATURED",
        isFeatured: true,
        features: [
            "Exterior Renders",
            "Interior Views",
            "4K Output",
            "Lighting & Materials",
        ],
        buttonTitle: "Explore Service",
        onClick: () => console.log("3D Architectural Visualization"),
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&auto=format&fit=crop&q=80"
        ]
    },
    {
        title: "2D Floor Plans & Layouts",
        description:
            "Accurate, presentation-ready floor plans with precise dimensions and furniture layouts for residential and commercial projects.",
        imageUrl:
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&auto=format&fit=crop&q=80",
        index: 2,
        tag: "ESSENTIAL",
        isFeatured: true,
        features: [
            "CAD Drawings",
            "Furniture Layout",
            "Clear Dimensions",
            "Print Ready",
        ],
        buttonTitle: "View Samples",
        onClick: () => console.log("2D Floor Plans & Layouts"),
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&auto=format&fit=crop&q=80"
        ]
    },
    {
        title: "Interior Design & Styling",
        description:
            "Curated interior concepts blending Kashmiri craftsmanship with modern aesthetics, tailored to your lifestyle and space.",
        imageUrl:
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&auto=format&fit=crop&q=80",
        index: 3,
        tag: "CREATIVE",
        isFeatured: true,
        features: [
            "Material Selection",
            "Color Schemes",
            "Custom Furniture",
            "Lighting Design",
        ],
        buttonTitle: "Start Your Project",
        onClick: () => console.log("Interior Design & Styling"),
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&auto=format&fit=crop&q=80"
        ]
    },

    {
        title: "Exterior Elevation Design",
        description:
            "Striking exterior elevation designs that define architectural character and enhance curb appeal.",
        imageUrl:
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1400&auto=format&fit=crop&q=80",
        index: 4,
        tag: "DESIGN",
        isFeatured: false,
        features: [
            "Modern Facades",
            "Material Finishes",
            "Day & Night Views",
        ],
        buttonTitle: "View Designs",
        onClick: () => console.log("Exterior Elevation Design"),
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&auto=format&fit=crop&q=80"
        ]
    },
    {
        title: "Walkthrough Animations",
        description:
            "Cinematic 3D walkthrough animations that bring architectural spaces to life before they are built.",
        imageUrl:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&auto=format&fit=crop&q=80",
        index: 5,
        tag: "IMMERSIVE",
        isFeatured: false,
        features: [
            "4K Animation",
            "Smooth Camera Paths",
            "Interior & Exterior",
        ],
        buttonTitle: "Watch Samples",
        onClick: () => console.log("Walkthrough Animations"),
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&auto=format&fit=crop&q=80"
        ]
    },
    {
        title: "Virtual Reality (VR) Experiences",
        description:
            "Immersive VR experiences allowing clients to explore spaces in real scale and real time.",
        imageUrl:
            "https://images.unsplash.com/photo-1593642634367-d91a135587b5?w=1400&auto=format&fit=crop&q=80",
        index: 6,
        tag: "VR",
        isFeatured: false,
        features: [
            "VR Ready Models",
            "Interactive Navigation",
            "Client Presentations",
        ],
        buttonTitle: "Explore VR",
        onClick: () => console.log("Virtual Reality Experiences"),
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&auto=format&fit=crop&q=80"
        ]
    },
    {
        title: "Landscape Design Visualization",
        description:
            "Beautiful landscape visualizations integrating greenery, lighting, and outdoor elements.",
        imageUrl:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&auto=format&fit=crop&q=80",
        index: 7,
        tag: "LANDSCAPE",
        isFeatured: false,
        features: [
            "Garden Layouts",
            "Outdoor Lighting",
            "Hardscape Elements",
        ],
        buttonTitle: "View Landscapes",
        onClick: () => console.log("Landscape Design Visualization"),
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&auto=format&fit=crop&q=80"
        ]
    },
    {
        title: "Commercial Space Planning",
        description:
            "Optimized layouts for offices, retail, and commercial environments focused on functionality and flow.",
        imageUrl:
            "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1400&auto=format&fit=crop&q=80",
        index: 8,
        tag: "COMMERCIAL",
        isFeatured: false,
        features: [
            "Office Layouts",
            "Retail Planning",
            "Space Optimization",
        ],
        buttonTitle: "Plan Your Space",
        onClick: () => console.log("Commercial Space Planning"),
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&auto=format&fit=crop&q=80"
        ]
    },
    {
        title: "Lighting Design & Visualization",
        description:
            "Professional lighting plans and renders showcasing mood, ambience, and architectural highlights.",
        imageUrl:
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1400&auto=format&fit=crop&q=80",
        index: 9,
        tag: "LIGHTING",
        isFeatured: false,
        features: [
            "Ambient Lighting",
            "Fixture Placement",
            "Day & Night Renders",
        ],
        buttonTitle: "See Lighting",
        onClick: () => console.log("Lighting Design & Visualization"),
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&auto=format&fit=crop&q=80"
        ]
    },
];


export const ourProjects: IProject[] = [
    {
        id: "showcase-1",
        title: "Modern Kashmir Villa",
        type: "Residential",
        description: "A stunning blend of traditional Kashmiri architecture with modern amenities, featuring intricate woodwork and contemporary design elements.",
        location: "Srinagar, Kashmir",
        image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600",
        status: "completed",
        client: "Private Client",
        year: "2024",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&auto=format&fit=crop&q=80"
        ]
    },
    {
        id: "showcase-2",
        title: "Heritage Hotel Design",
        type: "Commercial",
        description: "Restoration and modernization of a heritage property into a boutique hotel, preserving cultural authenticity while adding luxury amenities.",
        location: "Sopore, Kashmir",
        image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
        status: "completed",
        client: "Heritage Hotels Ltd",
        year: "2023",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&auto=format&fit=crop&q=80"
        ]
    },
    {
        id: "showcase-3",
        title: "Contemporary Office Space",
        type: "Commercial",
        description: "Modern office design incorporating natural light and local materials, creating an inspiring workspace for a tech company.",
        location: "Srinagar, Kashmir",
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
        status: "completed",
        client: "Tech Innovations",
        year: "2024",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&auto=format&fit=crop&q=80"
        ]
    },
    {
        id: "showcase-4",
        title: "Luxury Apartment Interior",
        type: "Interior",
        description: "Elegant interior design for a luxury apartment, featuring custom furniture and traditional Kashmiri craftsmanship.",
        location: "Srinagar, Kashmir",
        image: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600",
        status: "completed",
        client: "Private Residence",
        year: "2023",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&auto=format&fit=crop&q=80"
        ]
    },
    {
        id: "showcase-5",
        title: "Garden Landscape Design",
        type: "Landscape",
        description: "Beautiful garden design incorporating traditional Mughal garden elements with contemporary landscaping techniques.",
        location: "Sopore, Kashmir",
        image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600",
        status: "completed",
        client: "Private Estate",
        year: "2024",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&auto=format&fit=crop&q=80"
        ]
    },
    {
        id: "showcase-6",
        title: "Cultural Center Design",
        type: "Commercial",
        description: "Design for a cultural center celebrating Kashmiri arts and crafts, featuring exhibition spaces and workshop areas.",
        location: "Srinagar, Kashmir",
        image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
        status: "completed",
        client: "Cultural Foundation",
        year: "2023",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&auto=format&fit=crop&q=80"
        ]
    },
    {
        id: "showcase-7",
        title: "Mountain Resort Design",
        type: "Residential",
        description: "Eco-friendly mountain resort design that harmonizes with the natural landscape while providing luxury accommodations.",
        location: "Gulmarg, Kashmir",
        image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600",
        status: "completed",
        client: "Mountain Resorts",
        year: "2024",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&auto=format&fit=crop&q=80"
        ]
    },
    {
        id: "showcase-8",
        title: "Traditional Houseboat Renovation",
        type: "Residential",
        description: "Careful renovation of a traditional Kashmiri houseboat, preserving heritage while adding modern comforts.",
        location: "Dal Lake, Srinagar",
        image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
        status: "completed",
        client: "Heritage Tourism",
        year: "2023",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&auto=format&fit=crop&q=80"
        ]
    },
    {
        id: "showcase-9",
        title: "Artisan Workshop Complex",
        type: "Commercial",
        description: "Design for a complex of workshops dedicated to traditional Kashmiri crafts, promoting local artisans and cultural heritage.",
        location: "Sopore, Kashmir",
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
        status: "completed",
        client: "Craft Council",
        year: "2024",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&auto=format&fit=crop&q=80"
        ]
    }
];
