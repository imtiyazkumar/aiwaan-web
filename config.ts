const config = {
    inactivityDuration: 2, // hours
    appwrite: {
        endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
        projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || '',
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID || '',
        projectsCollectionId: import.meta.env.VITE_APPWRITE_PROJECTS_COLLECTION_ID || '',
        storageBucketId: import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID || '',
    }
};

export default config;