import { UploadFirebaseError } from "com/errors";

export const getFirebasePathFromUrl = (url: string): string => {
  try {
    if (url.startsWith("gs://")) {
      // Example: gs://bucket-name/path/to/file.jpg
      const parts = url.split("/");
      return parts.slice(3).join("/");
    }

    if (url.startsWith("https://storage.googleapis.com/")) {
      // Example: https://storage.googleapis.com/bucket-name/path/to/file.jpg
      const parts = url
        .replace("https://storage.googleapis.com/", "")
        .split("/");
      parts.shift(); // elimina el bucket
      return parts.join("/");
    }

    if (url.startsWith("https://firebasestorage.googleapis.com/")) {
      // Example: https://firebasestorage.googleapis.com/v0/b/.../o/encodedPath?...
      const match = decodeURIComponent(url).match(/\/o\/(.+)\?alt=media/);
      if (match && match[1]) return match[1];
    }

    throw new UploadFirebaseError("Unsupported Firebase Storage URL format");
  } catch (error) {
    throw new UploadFirebaseError(
      `Failed to extract path from URL: ${(error as Error).message}`
    );
  }
};
