import { ID, Query } from "appwrite";

import { account, avatar, database, storage, appwriteConfig} from "../appwrite/config";
import { INewUser } from "@/types";

// export async function createUserAccount(user: INewUser) {
//   try {
//     const newAccount = await account.create(
//       ID.unique(),
//       user.email,
//       user.password,
//       user.name
//     );

//     if (!newAccount) throw Error;
//     const AvatarUrl = avatar.getInitials(user.name);

//     const newUser = await saveUserToDB({
//       accountID: newAccount.$id,
//       email: newAccount.email,
//       name: newAccount.name,
//       imageUrl: AvatarUrl,
//       username: user.userName,
//     });

//     return newUser;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }


// export async function saveUserToDB(user: {
//   accountID: string;
//   email: string;
//   name: string;
//   imageUrl?: URL;
//   imageID?:string,
//   username?: string;
// }) {
//   try {
//     const newUser = await database.createDocument(
//       appwriteConfig.databaseID,
//       appwriteConfig.postCollectionID,
//       ID.unique(),
//       user
//     );

//     return newUser;
//   } catch (error) {
//     console.log(error);
//   }
// }



// export async function signInAccount(user:{email:string, password:string}){
//   try {
//      const session = await account.createEmailSession(user.email, user.password)
//      if(!session) return Error;

//      return session;
//   } catch (error) {
//     console.log(error.message)
//   }

// }

// export async function getCurrentUser(){
//   try {

//     const currentAccount = await account.get();
//     if(!currentAccount) return;
     
//     const currentUser =  await database.listDocuments(
//       appwriteConfig.databaseID,
//       appwriteConfig.postCollectionID,
//       [Query.equal("accountID", currentAccount.$id)]
//      )
//      if(!currentUser) throw Error;
      
//      return currentUser.documents[0]
//   } catch (error) {
//     console.log(error.message)
//   }
// }


// ============================== SIGN UP
export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatar.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountID: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// ============================== SAVE USER TO DB
export async function saveUserToDB(user: {
  accountID: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser = await database.createDocument(
      appwriteConfig.databaseID,
      appwriteConfig.postCollectionID,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

// ============================== SIGN IN
export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);

    return session;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET ACCOUNT
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    console.log({xxx: currentAccount})

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET USER
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await database.listDocuments(
      appwriteConfig.databaseID,
      appwriteConfig.postCollectionID,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function SignOutAccount () {
  try {
    const session = await account.deleteSession("current");
    if(!session) return;

    return session;
  } catch (error) {
    console.log(error.message)
  }
}


export async function createPost(post: INewPost) {
  try {
    // Upload file to appwrite storage
    const uploadedFile = await uploadFile(post.file[0]);

    if (!uploadedFile) throw Error;

    // Get file url
    const fileUrl = getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // Create post
    const newPost = await database.createDocument(
      appwriteConfig.databaseID,
      appwriteConfig.postCollectionID,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageID: uploadedFile.$id,
        location: post.location,
        tags: tags,
      }
    );

    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    return newPost;
  } catch (error) {
    console.log(error);
  }
}


export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageID,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}


export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageID,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function getRecentPosts() {
  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseID,
      appwriteConfig.postCollectionID,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}