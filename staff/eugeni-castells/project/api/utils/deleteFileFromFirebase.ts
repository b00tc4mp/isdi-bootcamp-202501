import { bucket } from "../firebase";
import { SystemError, UploadFirebaseError } from "com/errors";
import { isFirebaseError } from "./firebaseErrorChecker";
import { getFirebaseErrorMessage } from "./getFirebaseErrorMessage";

export const deleteImagesFromFirebase = async (
  imagePaths: string[]
): Promise<void> => {
  for (const path of imagePaths) {
    const file = bucket.file(path); // path és, per exemple, "van123/uuid_imatge.jpg"

    try {
      await file.delete();
    } catch (error) {
      if (isFirebaseError(error)) {
        throw new UploadFirebaseError(getFirebaseErrorMessage(error));
      } else {
        throw new SystemError((error as Error).message);
      }
    }
  }
};
