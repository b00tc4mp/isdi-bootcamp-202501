import { validate } from "com";
import { UpdateVanParam } from "com/types";
import { User, Van } from "../data";
import {
  NotFoundError,
  OwnershipError,
  SystemError,
  UploadFirebaseError,
} from "com/errors";
import { uploadImagesToFirebase } from "../utils/uploadToFirebase";
import { deleteImagesFromFirebase } from "../utils/deleteFileFromFirebase";
import { isFirebaseError } from "../utils/firebaseErrorChecker";

export const updateVan = (
  userId: string,
  vanId: string,
  vanInfo: UpdateVanParam,
  imagesToUpload: Express.Multer.File[]
) => {
  validate.id(userId, "user id");

  return (async () => {
    let user;
    try {
      user = await User.findById(userId);
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    if (!user) {
      throw new NotFoundError("user not found");
    }

    let van;
    try {
      van = await Van.findById(vanId);
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    if (!van) {
      throw new NotFoundError("van not found");
    }

    const ownsVan = user.vans.some((id) => id.toString() === vanId);

    if (!ownsVan) {
      throw new OwnershipError("user doesn't own the van");
    }

    const { imagesToDelete } = vanInfo;

    const {
      features: {
        heating,
        shower,
        airConditioning,
        insideKitchen,
        fridge,
        toilet,
      },
      traits: {
        accessible,
        doors,
        bedCount,
        maxTravellers,
        windows,
        fuelType,
        storage,
      },
      ...rest
    } = vanInfo;

    const updateData = {
      ...rest,
      heating,
      shower,
      airConditioning,
      insideKitchen,
      fridge,
      toilet,
      accessible,
      doors,
      bedCount,
      maxTravellers,
      windows,
      fuelType,
      storage,
      modifiedAt: new Date(),
    };
    try {
      await Van.updateOne(
        { _id: van._id },
        { $set: updateData },
        { runValidators: true }
      );
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    if (imagesToUpload?.length > 0) {
      let uploadedImages;
      try {
        uploadedImages = await uploadImagesToFirebase(
          imagesToUpload,
          van._id.toString()
        );

        uploadedImages.forEach((image) => {
          van.images.push(image); // image = { url, path }
        });
      } catch (error) {
        if (isFirebaseError(error)) {
          throw new UploadFirebaseError((error as Error).message);
        } else {
          throw new SystemError((error as Error).message);
        }
      }
    }

    if (imagesToDelete.length > 0) {
      try {
        await deleteImagesFromFirebase(imagesToDelete);
      } catch (error) {
        if (isFirebaseError(error)) {
          throw new UploadFirebaseError((error as Error).message);
        } else {
          throw new SystemError((error as Error).message);
        }
      }
    }

    van.images = van.images.filter((img) => {
      return !imagesToDelete.includes(img.path);
    });

    try {
      await van.save();
    } catch (error) {
      throw new SystemError((error as Error).message);
    }
  })();
};
