const config = {
    inactivityDuration: 2, // hours
    appwrite: {
        endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1",
        projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || "685d47d200131e659efb",
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID || "aiwaan",
        projectsCollectionId: "projects",
        contactMessagesCollectionId: "contact-messages",
        invoicesCollectionId: "invoices",
        storageBucketId: import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID || "",
    }
};

export default config;
