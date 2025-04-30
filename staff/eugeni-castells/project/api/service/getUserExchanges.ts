import { validate } from "com";
import { User } from "../data";
import { NotFoundError, SystemError } from "com/errors";
import { TripConfirmStatus } from "./types";
import { Types } from "mongoose";

export const getUserExchanges = (userId: string) => {
  validate.id(userId, "user id");

  return (async () => {
    let user;
    try {
      user = await User.findById(userId)
        .populate<{
          trips: {
            _id: Types.ObjectId;
            confirmStatus: TripConfirmStatus;
            startDate: Date;
            endDate: Date;
            price: number;
            vanOwner: {
              _id: Types.ObjectId;
              name: string;
              lastName: string;
              isUserOwner: boolean;
            };
          }[];
        }>({
          path: "trips",
          select: "confirmStatus startDate endDate price",
          populate: {
            path: "vanOwner",
            select: "name lastName",
          },
          options: { sort: { startDate: -1 } },
        })
        .select("-_v")
        .lean();
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    if (!user) {
      throw new NotFoundError("user not found");
    }

    const sanitizedTrips = user.trips.map((trip) => {
      const { _id, vanOwner, ...rest } = trip;

      const { _id: ownerObjectId, ...ownerRest } = vanOwner;
      return {
        ...rest,
        id: _id.toString(),
        owner: {
          ...ownerRest,
          id: ownerObjectId.toString(),
        },
      };
    });

    const returnedUserTrips = sanitizedTrips.map((trip) => {
      if (trip.confirmStatus === "accepted" && trip.owner.id === userId) {
        return trip;
      }
    });

    const pendingUserRequests = sanitizedTrips.map((trip) => {
      if (trip.confirmStatus !== "accepted" && trip.owner.id === userId)
        return trip;
    });

    const pendingRequestsFromOtherUsers = sanitizedTrips.map((trip) => {
      if (trip.confirmStatus !== "accepted" && trip.owner.id !== userId)
        return trip;
    });

    return {
      userTrips: returnedUserTrips,
      userRequests: pendingUserRequests,
      pendingRequests: pendingRequestsFromOtherUsers,
    };
  })();
};
