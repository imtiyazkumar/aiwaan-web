import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { databases, ID } from "../lib/appwrite";
import config from "../../config";

// Generic Appwrite hook for CRUD operations
export const useAppwriteCollection = <T>(collectionId: string) => {
    const queryClient = useQueryClient();

    // Get all documents
    const useGetDocuments = () => {
        return useQuery({
            queryKey: [collectionId],
            queryFn: async () => {
                const response = await databases.listDocuments(
                    config.appwrite.databaseId,
                    collectionId
                );
                return response.documents as T[];
            },
        });
    };

    // Get single document
    const useGetDocument = (documentId: string) => {
        return useQuery({
            queryKey: [collectionId, documentId],
            queryFn: async () => {
                const response = await databases.getDocument(
                    config.appwrite.databaseId,
                    collectionId,
                    documentId
                );
                return response as T;
            },
            enabled: !!documentId,
        });
    };

    // Create document
    const useCreateDocument = () => {
        return useMutation({
            mutationFn: async (data: Omit<T, "$id" | "$createdAt" | "$updatedAt">) => {
                const response = await databases.createDocument(
                    config.appwrite.databaseId,
                    collectionId,
                    ID.unique(),
                    data
                );
                return response as T;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [collectionId] });
            },
        });
    };

    // Update document
    const useUpdateDocument = () => {
        return useMutation({
            mutationFn: async ({ documentId, data }: { documentId: string; data: Partial<T> }) => {
                const response = await databases.updateDocument(
                    config.appwrite.databaseId,
                    collectionId,
                    documentId,
                    data
                );
                return response as T;
            },
            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({ queryKey: [collectionId] });
                queryClient.invalidateQueries({ queryKey: [collectionId, variables.documentId] });
            },
        });
    };

    // Delete document
    const useDeleteDocument = () => {
        return useMutation({
            mutationFn: async (documentId: string) => {
                await databases.deleteDocument(
                    config.appwrite.databaseId,
                    collectionId,
                    documentId
                );
                return documentId;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [collectionId] });
            },
        });
    };

    return {
        useGetDocuments,
        useGetDocument,
        useCreateDocument,
        useUpdateDocument,
        useDeleteDocument,
    };
};
