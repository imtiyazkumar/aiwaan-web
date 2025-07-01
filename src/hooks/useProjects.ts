import { useAppwriteCollection } from "./useAppwrite";
import { Project } from "../types/appwrite";
import config from "../../config";

export const useProjects = () => {
    return useAppwriteCollection<Project>(config.appwrite.projectsCollectionId);
};
