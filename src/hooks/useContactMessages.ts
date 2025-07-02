import { useAppwriteCollection } from "./useAppwrite";
// import { ContactMessage } from "../types/appwrite";
import config from "../../config";
import type { ContactMessage } from "../types/appwrite";

export const useContactMessages = () => {
    return useAppwriteCollection<ContactMessage>(config.appwrite.contactMessagesCollectionId);
};
