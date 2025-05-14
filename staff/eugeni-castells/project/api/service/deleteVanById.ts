import { validate } from "com";
import { Trip, User, Van } from "../data";
import { NotFoundError, SystemError } from "com/errors";
import { Types } from "mongoose";

export const deleteVanById = (userId: string, vanId: string) => {
  validate.id(userId, "user id");
  validate.id(vanId, "van Id");

  return (async () => {
    let user;
    try {
      user = await User.findById(userId);
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    if (!user) throw new NotFoundError("user not found");

    let van;
    try {
      van = await Van.findById(vanId)
        .populate<{
          trips: [
            {
              confirmStatus: "pending" | "accepted" | "rejected";
              startDate: Date;
              endDate: Date;
              _id: Types.ObjectId;
            }
          ];
        }>({ path: "trips", select: "confirmStatus startDate endDate" })
        .lean();
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    if (!van) throw new NotFoundError("van not found");

    let tripsToDelete: Types.ObjectId[] = [];

    try {
      const pendingTrips = await Trip.find({
        van: van._id,
        confirmStatus: "pending",
      }).select("_id");

      tripsToDelete = pendingTrips.map((t) => t._id);
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    try {
      await Promise.all([
        Van.deleteOne({ _id: van._id }),
        User.updateOne({ _id: user._id }, { $pull: { vans: van._id } }),
        User.updateMany(
          { trips: { $in: tripsToDelete } },
          { $pull: { trips: { $in: tripsToDelete } } }
        ),
        Trip.deleteMany({ _id: { $in: tripsToDelete } }),
      ]);
    } catch (error) {
      throw new SystemError((error as Error).message);
    }
  })();
};
