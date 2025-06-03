import { validate } from "com";
import { User } from "../data";
import { NotFoundError, SystemError } from "com/errors";
import { PopulatedAllUserInfo, ReturnedAllUserInfo } from "./types";

export const getAllUserInfo = (id: string): Promise<ReturnedAllUserInfo> => {
  validate.id(id, "user id");

  return (async () => {
    let user;

    try {
      user = await User.findById(id)
        .populate<PopulatedAllUserInfo>([
          {
            path: "location",
            select: "city country",
          },
          {
            path: "vans",
            select: "model brand price location",
            populate: {
              path: "location",
              select: "city country",
            },
          },
        ])
        .select("-__v")
        .lean();
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    if (!user) {
      throw new NotFoundError("user not found");
    }

    const sanitizedVans = user.vans.map((van) => ({
      id: van._id.toString(),
      model: van.model,
      brand: van.brand,
      price: van.price,
      location: {
        id: van.location._id.toString(),
        city: van.location.city,
        country: van.location.country,
      },
    }));

    const {
      _id,
      password,
      trips,
      location: { _id: locationObjectId, city, country },
      ...sanitizedUser
    } = user;

    const returnedUser = {
      ...sanitizedUser,
      id: _id.toString(),
      location: {
        id: locationObjectId.toString(),
        city,
        country,
      },
      vans: sanitizedVans,
    };

    return returnedUser;
  })();
};
