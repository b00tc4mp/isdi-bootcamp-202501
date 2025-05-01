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
            van: {
              _id: Types.ObjectId;
              owner: {
                _id: Types.ObjectId;
                name: string;
                lastName: string;
              };
            };
            renter: {
              _id: Types.ObjectId;
              name: string;
              lastName: string;
            };
          }[];
        }>({
          path: "trips",
          select:
            "confirmStatus startDate endDate price modifiedAt createdAt renter van",
          populate: [
            {
              path: "van",
              select: "owner",
              populate: {
                path: "owner",
                select: "name lastName",
              },
            },
            {
              path: "renter",
              select: "name lastName",
            },
          ],
          options: { sort: { startDate: 1 } },
        })
        .select("-__v")
        .lean();
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    if (!user) {
      throw new NotFoundError("user not found");
    }

    const sanitizedTrips = user.trips.map((trip) => {
      const { _id, van, renter, ...rest } = trip;

      const { owner } = van;

      const { _id: ownerObjectId, ...ownerRest } = owner;
      const { _id: renterObjectId, ...renterRest } = renter;

      return {
        ...rest,
        id: _id.toString(),
        owner: {
          ...ownerRest,
          id: ownerObjectId.toString(),
          isUser: ownerObjectId.toString() === userId,
        },

        renter: { ...renterRest, id: renterObjectId.toString() },
      };
    });
    //we make a filter instead of a map because if the condition is not matched the map method will return a null/undefined
    const returnedAllUserTrips = sanitizedTrips.filter((trip) => {
      if (trip.confirmStatus === "accepted") {
        return trip;
      }
    });

    const returnedUserTrips = returnedAllUserTrips.filter((trip) => {
      if (trip.owner.id !== userId) {
        return trip;
      }
    });

    const returnedUserVanTrips = returnedAllUserTrips.filter((trip) => {
      if (trip.owner.id === userId) {
        return trip;
      }
    });

    const pendingAllUserRequests = sanitizedTrips.filter((trip) => {
      if (trip.confirmStatus !== "accepted") return trip;
    });

    const pendingUserRequests = pendingAllUserRequests.filter((trip) => {
      if (trip.owner.id !== userId) return trip;
    });

    const pendingRequestsFromOtherUsers = pendingAllUserRequests.filter(
      (trip) => {
        if (trip.owner.id === userId) return trip;
      }
    );

    return {
      trips: {
        all: returnedAllUserTrips,
        user: returnedUserTrips,
        vans: returnedUserVanTrips,
      },
      pendingRequests: {
        all: pendingAllUserRequests,
        user: pendingUserRequests,
        toUser: pendingRequestsFromOtherUsers,
      },
    };
  })();
};
