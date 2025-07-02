import { databases, storage, ID } from "../../lib/appwrite";
import config from "../../../config";

export interface Project {
    $id?: string;
    projectName: string;
    projectDescription: string;
    projectType: string;
    address: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    budget: number;
    startDate: string;
    estimatedCompletion: string;
    status: string;
    imageUrl?: string;
    imageId?: string;
    $createdAt?: string;
    $updatedAt?: string;
}

export const createProject = async (projectData: Omit<Project, "$id" | "$createdAt" | "$updatedAt">) => {
    try {
        const response = await databases.createDocument(
            config.appwrite.databaseId,
            config.appwrite.projectsCollectionId,
            ID.unique(),
            projectData
        );
        return response;
    } catch (error) {
        console.error("Error creating project:", error);
        throw error;
    }
};

export const getProjects = async () => {
    try {
        const response = await databases.listDocuments(
            config.appwrite.databaseId,
            config.appwrite.projectsCollectionId
        );
        return response.documents as Project[];
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
    }
};

export const getProject = async (projectId: string) => {
    try {
        const response = await databases.getDocument(
            config.appwrite.databaseId,
            config.appwrite.projectsCollectionId,
            projectId
        );
        return response as Project;
    } catch (error) {
        console.error("Error fetching project:", error);
        throw error;
    }
};

export const updateProject = async (projectId: string, projectData: Partial<Project>) => {
    try {
        const response = await databases.updateDocument(
            config.appwrite.databaseId,
            config.appwrite.projectsCollectionId,
            projectId,
            projectData
        );
        return response;
    } catch (error) {
        console.error("Error updating project:", error);
        throw error;
    }
};

export const deleteProject = async (projectId: string) => {
    try {
        await databases.deleteDocument(
            config.appwrite.databaseId,
            config.appwrite.projectsCollectionId,
            projectId
        );
    } catch (error) {
        console.error("Error deleting project:", error);
        throw error;
    }
};

export const uploadProjectImage = async (file: File) => {
    try {
        const response = await storage.createFile(
            config.appwrite.storageBucketId,
            ID.unique(),
            file
        );

        const imageUrl = storage.getFileView(
            config.appwrite.storageBucketId,
            response.$id
        );

        return {
            imageId: response.$id,
            imageUrl: imageUrl.href
        };
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};

export const deleteProjectImage = async (imageId: string) => {
    try {
        await storage.deleteFile(config.appwrite.storageBucketId, imageId);
    } catch (error) {
        console.error("Error deleting image:", error);
        throw error;
    }
};
