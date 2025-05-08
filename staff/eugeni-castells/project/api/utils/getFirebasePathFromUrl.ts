import { UploadFirebaseError } from "com/errors";

export const getFirebasePathFromUrl = (url: string): string => {
  try {
    const storageBaseUrl = "https://storage.googleapis.com/";
    if (!url.startsWith(storageBaseUrl)) {
      throw new UploadFirebaseError("Invalid Firebase Storage URL");
    }

    // Eliminem la part del domini i bucket
    const parts = url.replace(storageBaseUrl, "").split("/");
    // El primer element és el nom del bucket, la resta és el path
    parts.shift();
    return parts.join("/");
  } catch (error) {
    throw new UploadFirebaseError(
      `Failed to extract path from URL: ${(error as Error).message}`
    );
  }
};
