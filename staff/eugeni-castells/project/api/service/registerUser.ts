import { validate } from "com";
import bcrypt from "bcryptjs";
import { User, Location } from "../data/index.js";
import { DuplicityError, SystemError } from "com/errors";
import { UserDocType, LocationDocType } from "../data/index.js";
import { NewUserInfo } from "./types.js";

export const registerUser = (newUserInfo: NewUserInfo): Promise<void> => {
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
  validate.text(city, "city");
  validate.minLength(city, 2, "city min length");
  validate.text(country, "country");
  validate.maxLength(city, 25, "city max length");
  validate.minLength(country, 2, "country min length");
  validate.maxLength(country, 25, "country max length");

  validate.email(email, "email");
  validate.password(password, "password");
  validate.text(name, "name");
  validate.minLength(name, 3, "name");
  validate.maxLength(name, 15, "name");

  let locationSend: LocationDocType;

  return Promise.all([
    User.findOne({ $or: [{ email }] }).lean(),
    Location.create({
      city,
      country,
      point: { type: "Point", coordinates: coordinates },
      address,
    }),
  ])
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then(([user, _locationSend]) => {
      if (user) throw new DuplicityError("user already exists");

      locationSend = _locationSend;

      return bcrypt
        .hash(password, 10)
        .catch((error) => {
          throw new SystemError(error.message);
        })
        .then((hashedPassword) => {
          const newUser: Partial<UserDocType> = {
            name,
            email,
            password: hashedPassword,
            location: locationSend._id,
          };

          return User.create(newUser).catch((error) => {
            if (error.code === 11000)
              throw new DuplicityError("user already exists");

            throw new SystemError(error.message);
          });
        })
        .then(() => {});
    });
};
