import { validate } from "com";
import { Trip, User, Van } from "../data";
import {
  NotFoundError,
  SystemError,
  OverlapError,
  ValidationError,
} from "com/errors";
import { PopulatedTrip } from "./types";
import { filterTripsByDate } from "../utils";
import { RequestTripParams } from "./types";

/*Restrictions:
- User exists
- Van exists
- User have trips on the requested trip dates
- Van have trips on the requested trip date (redundant maybe)
- Van travellers >= tripTravellers
*/

export const generateTripRequest = (
  userId: string,
  vanId: string,
  tripInfo: RequestTripParams
): Promise<void> => {
  validate.id(userId, "user id");
  validate.id(vanId, "van id");

  if (!tripInfo.selectedDates) {
    throw new ValidationError("selectedDates is required");
  }

  return (async () => {
    let user;
    let van;

    const { selectedDates, totalPrice, ...rest } = tripInfo;

    const { startDate, endDate } = selectedDates;
    try {
      [user, van] = await Promise.all([
        User.findById(userId)
          .populate<{
            trips: PopulatedTrip[];
          }>({
            path: "trips",
            select: "startDate endDate",
          })
          .lean(),
        Van.findById(vanId)
          .populate<{
            trips: PopulatedTrip[];
          }>({
            path: "trips",
            select: "startDate endDate",
          })
          .lean(),
      ]);
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    //not found restriction
    if (!user) throw new NotFoundError("user not found");
    if (!van) throw new NotFoundError("van not found");

    //This will return true if the filter returns one user (the user) or false if it returns 0 users (the user hasnt pass the filter)
    //We put the user into an array because thats what the function expects
    const noUserOverlap = !!filterTripsByDate([user], startDate, endDate)
      .length;

    if (!noUserOverlap) {
      throw new OverlapError("you already have a trip on these dates!");
    }

    const noVanOverlap = !!filterTripsByDate([van], startDate, endDate).length;

    if (!noVanOverlap) {
      throw new OverlapError("requested van is already booked");
    }

    let trip;
    //Create trip with all the info
    try {
      trip = await Trip.create({
        ...rest,
        price: totalPrice,
        renter: userId,
        vanOwner: van.owner,
        startDate: startDate,
        endDate: endDate,
        van: van._id,
      });
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    //insert generated trip into renter and van Owner and van
    try {
      //We update the user and the van trip info by pushing the created trip id to the trips array
      await Promise.all([
        User.updateOne({ _id: userId }, { $push: { trips: trip._id } }),
        Van.updateOne({ _id: vanId }, { $push: { trips: trip._id } }),
        User.updateOne({ _id: van.owner }, { $push: { trips: trip._id } }),
      ]);
    } catch (error) {
      throw new SystemError((error as Error).message);
    }
  })();
};
