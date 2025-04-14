import { validate } from "com";
import { User, Van, Location } from "../data";
import { NotFoundError, SystemError } from "com/errors";
import { constant } from "com";

const { MAX_DISTANCE } = constant;

export const getVans = (userId: string): Promise<object[]> => {
  validate.id(userId, "user id");

  return (async () => {
    try {
      const returnedUser = await User.findById(userId).lean();

      if (!returnedUser) throw new NotFoundError("user not found");

      const location = await Location.findById(returnedUser.location).lean();

      const vans = await Van.find({
        "location.point": {
          $nearSphere: {
            $geometry: {
              type: "Point",
              coordinates: location?.point.coordinates,
            },
            $maxDistance: 50 * 1000,
          },
        },
      })
        .lean()
        .select("-__v")
        .sort("-createdAt");

      return vans.map((van) => van);
    } catch (error) {
      const err = error as Error;

      console.error(error);

      throw new SystemError(err.message);
    }
  })();
};
