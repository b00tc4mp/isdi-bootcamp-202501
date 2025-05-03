import { validate } from "com";
import { Trip, User } from "../data";
import { NotFoundError, OwnershipError, SystemError } from "com/errors";
import { Chat } from "../data/models/chat";
import { Types } from "mongoose";

/*Conditions:
- user exists
- trip exists
- user owns van with this trip
*/
export const acceptTripRequest = (
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
            owner: {
              _id: Types.ObjectId;
              name: string;
              lastName: string;
            };
          };
        }>({
          path: "van",
          select: "owner",
        })
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
      const result = await Trip.updateOne(
        { _id: tripId },
        {
          $set: {
            confirmStatus: "accepted",
            modifiedAt: new Date(),
          },
        },
        { runValidators: true }
      );

      if (result.matchedCount === 0) {
        throw new NotFoundError("trip not found during update");
      }

      if (result.modifiedCount === 0) {
        throw new SystemError("Trip update failed");
      }
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    try {
      //We check that no chat is opened if the user has booked his own van
      if (user._id !== trip.renter) {
        //We create the chat between the two participants
        const chat = await Chat.create({
          participants: [user._id, new Types.ObjectId(trip.renter)],
          createdAt: new Date(),
        });

        await Promise.all([
          User.updateOne({ _id: user._id }, { $push: { chats: chat._id } }),
          User.updateOne({ _id: trip.renter }, { $push: { chats: chat._id } }),
        ]);
      }
    } catch (error) {
      throw new SystemError((error as Error).message);
    }
  })();
};
