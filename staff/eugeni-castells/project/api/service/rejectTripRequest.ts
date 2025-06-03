import { Types, validate } from "com";
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
        .populate<{
          van: {
            owner: Types.ObjectId;
          };
        }>({ path: "van", select: "owner" })
        .lean();
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    if (!trip) {
      throw new NotFoundError("trip not found");
    }

    if (trip.van.owner.toString() !== userId) {
      throw new OwnershipError(
        "user doesn't own the van associated to the trip"
      );
    }

    try {
      const result = await Trip.deleteOne({ _id: tripId });

      if (result.deletedCount === 0) {
        throw new NotFoundError("trip not found during deletion");
      }
    } catch (error) {
      throw new SystemError((error as Error).message);
    }
  })();
};
