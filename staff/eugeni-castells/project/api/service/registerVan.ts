import { validate } from "com";
import { NotFoundError, SystemError, UploadFirebaseError } from "com/errors";
import { User, Van } from "../data";
import { RegisterVanParam } from "com/types";
import { uploadImagesToFirebase } from "../utils/uploadToFirebase";

export const registerVan = (
  userId: string,
  newVanInfo: RegisterVanParam,
  images: Express.Multer.File[]
): Promise<void> => {
  validate.id(userId, "user id");

  return (async () => {
    let user;

    try {
      user = await User.findById(userId);
    } catch (error) {
      const err = error as Error;
      console.error(err.message);
      throw new SystemError(err.message);
    }
    if (!user) throw new NotFoundError("user not found");

    const {
      features: {
        airConditioning,
        fridge,
        heating,
        insideKitchen,
        shower,
        toilet,
      },
      traits: {
        accessible,
        bedCount,
        doors,
        fuelType,
        maxTravellers,
        storage,
        windows,
      },
      ...decomposedVan
    } = newVanInfo;

    let van;
    try {
      van = await Van.create({
        ...decomposedVan,
        owner: user._id,
        location: user.location._id,
        airConditioning,
        fridge,
        heating,
        insideKitchen,
        shower,
        toilet,
        accessible,
        bedCount,
        doors,
        fuelType,
        maxTravellers,
        storage,
        windows,
      });
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    let uploadedImages;
    try {
      uploadedImages = await uploadImagesToFirebase(images, van._id.toString());

      van.images = uploadedImages;
    } catch (error) {
      if (
        error instanceof UploadFirebaseError ||
        error instanceof SystemError
      ) {
        throw error;
      } else {
        throw new SystemError((error as Error).message);
      }
    }

    try {
      await van.save();
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    user.vans.push(van._id);

    try {
      await User.updateOne({ _id: userId }, { $set: { vans: user.vans } });
    } catch (error) {
      throw new SystemError((error as Error).message);
    }
  })();
};
