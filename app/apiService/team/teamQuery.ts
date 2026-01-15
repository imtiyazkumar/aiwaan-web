import { useQuery } from "@tanstack/react-query";
import TeamAPI from "./teamAPI";

export enum Team_Query_Key {
    TEAM = 'TEAM'
}

const useQueryGetTeamMembers = () => {
    return useQuery({
        queryKey: [Team_Query_Key.TEAM],
        queryFn: () => TeamAPI.getAll(),
    });
};

const TeamQuery = {
    useQueryGetTeamMembers
};

export default TeamQuery;
