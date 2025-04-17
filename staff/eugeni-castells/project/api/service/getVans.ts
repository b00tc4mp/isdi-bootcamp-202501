import { validate } from "com";
import { User, Van, Location } from "../data";
import { NotFoundError, SystemError } from "com/errors";

export const getVans = (userId: string): Promise<object[]> => {
  validate.id(userId, "user id");

  return (async () => {
    try {
      const returnedUser = await User.findById(userId).lean();

      if (!returnedUser) throw new NotFoundError("user not found");

      const location = await Location.findById(
        returnedUser.location._id
      ).lean();

      if (!location?.point?.coordinates)
        throw new NotFoundError("user location not found or incomplete");

      const nearbyLocations = await Location.find({
        point: {
          $nearSphere: {
            $geometry: {
              type: "Point",
              coordinates: location.point.coordinates,
            },
            $maxDistance: 50 * 1000,
          },
        },
      }).select("_id");

      const locationIds = nearbyLocations.map((loc) => loc._id);

      const vans = await Van.find({
        location: { $in: locationIds },
      })
        .lean()
        .select("-__v")
        .sort("-createdAt");

      return vans;
    } catch (error) {
      console.error(error);
      throw new SystemError((error as Error).message);
    }
  })();
};
