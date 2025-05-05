import "dotenv/config";
import { expect } from "chai";
import { data, User, Van } from "../data";
import { registerVan } from "./registerVan";
import { Toilet, Shower, Fuel } from "../data/types";

const { MONGO_URI, MONGO_DB_TEST } = process.env;

describe("registerVan", () => {
  before(() => {
    return data.connect(MONGO_URI!, MONGO_DB_TEST!);
  });

  beforeEach(() => {
    return Promise.all([User.deleteMany({}), Van.deleteMany({})]);
  });

  it("succeeds on registering van", () => {
    const newVanInfoObject = {
      description: "great van!",
      traits: {
        accessible: true,
        windows: 9,
        doors: 10,
        fuelType: "petrol" as Fuel,
        storage: 78,
        bedCount: 3,
        maxTravellers: 3,
      },
      features: {
        heating: false,
        airConditioning: false,

        insideKitchen: false,
        fridge: true,
        toilet: "fixed" as Toilet,
        shower: true,
      },
      model: "wrong",
      brand: "Jackson-Warren",
      year: new Date(new Date().getFullYear(), 0, 1),
      // images: [
      //   { id: "2223223", uri: "https://www.lorempixel.com/132/843" },
      //   { id: "efgwrg", uri: "https://placekitten.com/27/965" },
      // ],

      price: 317.66,
      reviews: [],
      location: "5f52c9f00f5f4640b1b4dcef",
      legal: [
        "5f52c9f00f5f4640b1b4dcea",
        "5f52c9f00f5f4640b1b4dceb",
        "5f52c9f00f5f4640b1b4dcec",
      ],
      trips: [],
    };
    return User.create({
      name: "Eugeni",
      username: "euge",
      email: "eu@ge.com",
      password: "123123123",
      location: "123123123123123123123234",
    })
      .then(() => User.findOne({ name: "Eugeni" }).lean())
      .then((user) => {
        if (user) {
          //we need to convert this to unknown and then to the multer type
          const file = 2 as unknown as Express.Multer.File[];
          return registerVan(user._id.toString(), newVanInfoObject, file);
        }
      })
      .then(() => {
        return Van.find({});
      })
      .then((vans) => {
        expect(vans[0]).to.be.instanceOf(Object);
        expect(vans[0].heating).to.equal(false);
      });
  });

  afterEach(() => {
    return Promise.all([User.deleteMany({}), Van.deleteMany({})]);
  });

  after(() => {
    return data.disconnect();
  });
});
