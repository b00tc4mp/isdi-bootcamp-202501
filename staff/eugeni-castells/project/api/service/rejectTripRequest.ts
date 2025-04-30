import { validate } from "com";
import { Trip, User } from "../data";
import { NotFoundError, OwnershipError, SystemError } from "com/errors";

/*Conditions:
- user exists
-trip exists
- user owns van with this trip
*/
export const rejectTripRequest = (
  userId: string,
  tripId: string
): Promise<void> => {
  validate.id(userId, "user id");
  validate.id(tripId, "trip id");

  return (async () => {
    let user;

    try {
      user = await User.findById(userId).lean();
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    if (!user) {
      throw new NotFoundError("user not found");
    }

    let trip;
    try {
      trip = await Trip.findById(tripId)
        .populate<{ owner: string }>({ path: "van", select: "owner" })
        .lean();
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    if (!trip) {
      throw new NotFoundError("trip not found");
    }

    if (trip.owner !== userId) {
      throw new OwnershipError(
        "user doesn't own the van associated to the trip"
      );
    }

    try {
      const result = await Trip.updateOne(
        { _id: tripId },
        {
          $set: {
            confirmStatus: "rejected",
            modifiedAt: new Date(),
          },
        },
        { runValidators: true }
      );

      if (result.matchedCount === 0) {
        throw new NotFoundError("Trip not found during update");
      }

      if (result.modifiedCount === 0) {
        throw new SystemError("Trip update failed");
      }
    } catch (error) {
      throw new SystemError((error as Error).message);
    }
  })();
};
