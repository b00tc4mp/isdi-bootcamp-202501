import { validate } from "com";
import { UpdateVanParam } from "com/types";

export const updateVan = (
  userId: string,
  vanInfo: UpdateVanParam,
  imagesToUpload: Express.Multer.File[]
) => {
  validate.id(userId, "user id");

  return () => {};
};
