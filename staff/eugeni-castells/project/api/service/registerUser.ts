import { validate } from "com";
import bcrypt from "bcryptjs";
import { User, Location } from "../data/index.js";
import { DuplicityError, LocationError, SystemError } from "com/errors";
import { UserDocType, LocationDocType } from "../data/index.js";
import { NewUserInfo } from "./types.js";
import { getCityCountryFromCoords } from "../utils/getCityAndCountryFromCoords.js";

export const registerUser = async (newUserInfo: NewUserInfo): Promise<void> => {
  debugger;
  const {
    lastName,
    name,
    email,
    password,
    city,
    country,
    address,
    coordinates,
  } = newUserInfo;

  validate.username(lastName, "lastName");

  let _city = city;
  let _country = country;

  if (!_city && !_country) {
    try {
      const response = await getCityCountryFromCoords(
        coordinates[0],
        coordinates[1]
      );
      _city = response.city;
      _country = response.country;
    } catch (error) {
      throw new LocationError((error as Error).message);
    }
  }

  if (_city && _country) {
    validate.text(_city, "city");
    validate.minLength(_city, 2, "city min length");
    validate.maxLength(_city, 25, "city max length");
    validate.text(_country, "country");
    validate.minLength(_country, 2, "country min length");
    validate.maxLength(_country, 25, "country max length");
  }

  validate.email(email, "email");
  validate.password(password, "password");
  validate.text(name, "name");
  validate.minLength(name, 3, "name");
  validate.maxLength(name, 15, "name");

  let user;
  try {
    user = await User.findOne({ $or: [{ email }] }).lean();
  } catch (error) {
    throw new SystemError((error as Error).message);
  }

  if (user) {
    throw new DuplicityError("user already exists");
  }

  let locationSend: LocationDocType;
  try {
    locationSend = await Location.create({
      city: _city,
      country: _country,
      point: { type: "Point", coordinates },
      address,
    });
  } catch (error) {
    throw new SystemError((error as Error).message);
  }

  let hashedPassword: string;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    throw new SystemError((error as Error).message);
  }

  const newUser: Partial<UserDocType> = {
    name,
    lastName,
    email,
    password: hashedPassword,
    location: locationSend._id,
  };

  try {
    await User.create(newUser);
  } catch (error: any) {
    if (error.code === 11000) {
      throw new DuplicityError("user already exists");
    }
    throw new SystemError(error.message);
  }
};
