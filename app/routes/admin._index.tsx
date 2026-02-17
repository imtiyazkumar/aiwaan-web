import { Link, useNavigate } from "react-router";
import { Div, Flex, FlexColumn } from "~/components/general/BaseComponents";
import { wrapperBaseClass } from "~/utils/constants";
import { FolderKanban, PlusCircle, CreditCard, ChevronRight } from "lucide-react";

export default function AdminIndex() {
  const navigate = useNavigate();

  const adminOptions = [
    {
      title: "Manage Projects",
      description: "View, edit, and delete existing projects from your portfolio.",
      icon: <FolderKanban size={32} className="text-primary-base" />,
      link: "/admin/projects",
      color: "bg-blue-50"
    },
    {
      title: "Manage Users",
      description: "View and manage all registered users.",
      icon: <FolderKanban size={32} className="text-indigo-600" />,
      link: "/admin/users",
      color: "bg-indigo-50"
    },
    {
      title: "Manage Orders",
      description: "View and track all client orders.",
      icon: <CreditCard size={32} className="text-orange-600" />,
      link: "/admin/orders",
      color: "bg-orange-50"
    },
    {
      title: "Manage Bills",
      description: "View and manage all bills and invoices.",
      icon: <CreditCard size={32} className="text-pink-600" />,
      link: "/admin/bills",
      color: "bg-pink-50"
    },
    {
      title: "Testimonials",
      description: "Approve and manage client testimonials.",
      icon: <FolderKanban size={32} className="text-yellow-600" />,
      link: "/admin/testimonials",
      color: "bg-yellow-50"
    },
    {
      title: "Support Chat",
      description: "View and reply to customer support threads.",
      icon: <FolderKanban size={32} className="text-teal-600" />,
      link: "/admin/messages",
      color: "bg-teal-50"
    },
    {
      title: "Add New Project",
      description: "Create a new project entry with details, images, and categories.",
      icon: <PlusCircle size={32} className="text-green-600" />,
      link: "/add-edit-project",
      color: "bg-green-50"
    },
  ];

  return (
    <>
      <br />
      <FlexColumn className="w-full gap-6">
        <Div className="text-center md:text-left">
          <p className="text-secondary-600 mt-2">
            Welcome to your control center. Manage your projects and account settings from here.
          </p>
        </Div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {adminOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => navigate(option.link)}
              className={`${wrapperBaseClass} !items-start !justify-start !p-6 cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group`}
            >
              <Flex className={`w-14 h-14 rounded-full items-center justify-center ${option.color} mb-4 group-hover:scale-110 transition-transform`}>
                {option.icon}
              </Flex>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2 group-hover:text-primary-base transition-colors">
                {option.title}
              </h3>
              <p className="text-secondary-600 text-sm mb-4">
                {option.description}
              </p>
              <Flex className="w-full justify-end mt-auto">
                <span className="text-sm font-medium text-primary-base flex items-center gap-1 group-hover:gap-2 transition-all">
                  Go to {option.title} <ChevronRight size={16} />
                </span>
              </Flex>
            </div>
          ))}
        </div>
      </FlexColumn>
    </>
  );
}
