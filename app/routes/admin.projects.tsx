import { useNavigate } from "react-router";
import { Edit, Trash2, Plus, Search } from "lucide-react";
import { Div, Flex, FlexColumn } from "~/components/general/BaseComponents";
import Button from "~/components/buttons/Button";
import { wrapperBaseClass } from "~/utils/constants";
import { useState, useEffect } from "react";

import ProjectQuery from "~/apiService/project/projectQuery";

export default function AdminProjects() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading: loading } = ProjectQuery.useQueryGetProjects({});
  const projects = data?.projects || [];

  const deleteMutation = ProjectQuery.useMutationDeleteProject();

  const filteredProjects = projects.filter(project =>
    project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this project?")) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          // Invalidate handled by mutation hook
        },
        onError: (error) => {
          console.error('Error deleting project:', error);
          alert('Failed to delete project');
        }
      });
    }
  };

  return (
    <FlexColumn className="w-full gap-6">
      <Flex className="w-full justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-col md:flex-row gap-4">
        <Div className="w-full md:w-96">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects by name or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-base/20 transition-all"
            />
          </div>
        </Div>
        <Button
          onClick={() => navigate("/add-edit-project")}
          className="whitespace-nowrap"
          variant="primary_filled"
        >
          <Plus size={18} /> Add New Project
        </Button>
      </Flex>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <Div className="text-center py-10 text-gray-500">Loading projects...</Div>
        ) : filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`${wrapperBaseClass} !flex-row !justify-between !items-start !p-4 !my-0 hover:border-l-4 hover:border-l-primary-base transition-all duration-200 group`}
          >
            <Flex className="gap-4">
              <div className="h-24 w-32 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={project.image_url || 'https://via.placeholder.com/300?text=No+Image'}
                  alt={project.title}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <FlexColumn className="justify-center">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{project.title}</h3>
                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 w-fit mb-1">
                  {project.type}
                </span>
                <p className="text-sm text-gray-500 line-clamp-1 text-ellipsis max-w-md">
                  {project.location} • {project.year}
                </p>
                {project.is_featured && (
                  <span className="text-xs text-amber-600 font-semibold mt-1">★ Featured</span>
                )}
              </FlexColumn>
            </Flex>

            <Flex className="gap-2 self-center">
              <button
                onClick={() => navigate(`/add-edit-project?id=${project.id}`)}
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={(e) => handleDelete(project.id, e)}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 size={20} />
              </button>
            </Flex>
          </div>
        ))}

        {!loading && filteredProjects.length === 0 && (
          <Div className="text-center py-10 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
            No projects found matching your search.
          </Div>
        )}
      </div>
    </FlexColumn>
  );
}
