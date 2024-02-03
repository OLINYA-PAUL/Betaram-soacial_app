import { ID, Query } from "appwrite";

import { account, avatar, database,storage,appwriteConfig} from "../appwrite/config";
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
//       accountId: newAccount.$id,
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
//   accountId: string;
//   email: string;
//   name: string;
//   imageUrl?: URL;
//   imageid?:string,
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
//       [Query.equal("accountId", currentAccount.$id)]
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
      accountId: newAccount.$id,
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
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
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

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}
