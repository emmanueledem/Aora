import {
  Client,
  Account,
  ID,
  Avatars,
  Query,
  Databases,
  Storage,
} from "react-native-appwrite";

export const appWriteConfig = {
  baseUrl: "https://cloud.appwrite.io/v1",
  platform: "com.emma.aora",
  projectID: "667c85d50008dae60c94",
  databaseID: "667c883b0002f668a218",
  userCollectionID: "667c897f003049935376",
  videosCollectionID: "667c899900269108fb01",
  storgeID: "667c8c41002343f0614f",
};

// Init your Web SDK
const client = new Client();

client
  .setEndpoint(appWriteConfig.baseUrl) // Your Appwrite Endpoint
  .setProject(appWriteConfig.projectID)
  .setPlatform(appWriteConfig.platform); // Your project ID

const account = new Account(client);
const avatars = new Avatars(client);
const dataBases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error();
    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);
    const newUser = await dataBases.createDocument(
      appWriteConfig.databaseID,
      appWriteConfig.userCollectionID,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// sign in
export const signIn = async (email, password) => {
  try {
    // await account.deleteSession("current");
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// get current user
export const getCurrentUser = async () => {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await dataBases.listDocuments(
      appWriteConfig.databaseID,
      appWriteConfig.userCollectionID,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getAllPosts = async () => {
  try {
    const post = await dataBases.listDocuments(
      appWriteConfig.databaseID,
      appWriteConfig.videosCollectionID,
      [Query.orderDesc("$createdAt")]
    );
    return post.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const post = await dataBases.listDocuments(
      appWriteConfig.databaseID,
      appWriteConfig.videosCollectionID,
      [Query.orderDesc("$createdAt", Query.limit(7))]
    );
    return post.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getAllMyPosts = async (userId) => {
  try {
    const post = await dataBases.listDocuments(
      appWriteConfig.databaseID,
      appWriteConfig.videosCollectionID,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
    );
    return post.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const searchPosts = async (query) => {
  try {
    const post = await dataBases.listDocuments(
      appWriteConfig.databaseID,
      appWriteConfig.videosCollectionID,
      [Query.search("title", query)]
    );
    return post.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const logOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFilePreview = async (fileID, type) => {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appWriteConfig.storgeID, fileID);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appWriteConfig.storgeID,
        fileID,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid  File Type");
    }
    if (!fileUrl) return;
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;
  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      appWriteConfig.storgeID,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const createVideo = async (form) => {
  try {
    const [thumbNailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbNail, "image"),
      uploadFile(form.video, "video"),
    ]);
    const newPost = await dataBases.createDocument(
      appWriteConfig.databaseID,
      appWriteConfig.videosCollectionID,
      ID.unique(),
      {
        title: form.title,
        thumbNail: thumbNailUrl,
        prompt: form.prompt,
        video: videoUrl,
        creator: form.userId,
      }
    );
    return newPost;
  } catch (error) {
    throw new Error(error);
  }
};
