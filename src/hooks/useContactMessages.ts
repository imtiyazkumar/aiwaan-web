import { useAppwriteCollection } from "./useAppwrite";
import { ContactMessage } from "../types/appwrite";
import config from "../../config";

export const useContactMessages = () => {
    return useAppwriteCollection<ContactMessage>(config.appwrite.contactMessagesCollectionId);
};
