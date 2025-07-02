import { useAppwriteCollection } from "./useAppwrite";
import config from "../../config";
import type { Project } from "../types/appwrite";

export const useProjects = () => {
    return useAppwriteCollection<Project>(config.appwrite.projectsCollectionId);
};
