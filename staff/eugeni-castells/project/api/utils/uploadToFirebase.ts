import { SystemError, UploadFirebaseError } from "com/errors";
import { bucket } from "../firebase"; // firebase config file
import { v4 as uuidv4 } from "uuid";
import { FirebaseStructuredError, FirebaseUploadedImage } from "./types";
import { isFirebaseError } from "./firebaseErrorChecker";
import { getFirebaseErrorMessage } from "./getFirebaseErrorMessage";

export const uploadImagesToFirebase = async (
  files: Express.Multer.File[],
  vanId: string
): Promise<FirebaseUploadedImage[]> => {
  const uploadedImages: FirebaseUploadedImage[] = [];

  for (const file of files) {
    const fileName = `${vanId}/${uuidv4()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    try {
      await fileUpload.save(file.buffer, {
        metadata: {
          contentType: file.mimetype,
        },
      });
    } catch (error) {
      if (isFirebaseError(error)) {
        throw new UploadFirebaseError(getFirebaseErrorMessage(error));
      } else {
        throw new SystemError((error as Error).message);
      }
    }

    try {
      await fileUpload.makePublic();
    } catch (error) {
      if (isFirebaseError(error)) {
        throw new UploadFirebaseError(
          (error as FirebaseStructuredError).error.message
        );
      } else {
        throw new SystemError((error as Error).message);
      }
    }

    uploadedImages.push({
      url: fileUpload.publicUrl(),
      path: fileName, // this is firebase intern path
    });
  }

  return uploadedImages;
};
