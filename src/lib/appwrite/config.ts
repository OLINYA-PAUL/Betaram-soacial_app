
import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
    url: import.meta.env.VITE_APPWRITE_URL,
    projectID : import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageID:import.meta.env.VITE_APPWRITE_STORAGE_ID ,
    userCollectID:import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    postCollectionID:import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID ,
    savesCollectionID:import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID 
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url).setProject(appwriteConfig.projectID);

export const storage = new Storage(client);
export const avatar = new Avatars(client);
export const account = new Account(client);
export const database = new Databases(client);
console.log({storage
, avatar, account, database})