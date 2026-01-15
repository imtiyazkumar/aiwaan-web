import { api } from "~/lib/api";
import type { ITeamMember } from "~/types/team";

const getAll = async () => {
    // 'team_members' table is missing in migration. Using /users endpoint.
    // Assuming all users are team members or we should filter on server. 
    // For now fetching all users.
    const { data } = await api.get<{ data: any[] }>('/users');

    // transform/cast to TeamMember if needed
    return {
        teamMembers: data as ITeamMember[]
    };
};

const TeamAPI = {
    getAll
};

export default TeamAPI;
