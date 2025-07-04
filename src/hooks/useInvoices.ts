import { useAppwriteCollection } from "./useAppwrite";
import type { Invoice } from "../types/appwrite";
import config from './../../config';

export const useInvoices = () => {
    return useAppwriteCollection<Invoice>(config.appwrite.invoicesCollectionId);
};
