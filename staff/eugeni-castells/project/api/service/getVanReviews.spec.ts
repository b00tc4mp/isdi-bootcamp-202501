import "dotenv/config";
import { expect } from "chai";
import { Types } from "mongoose";
import { data, User, Van, Review } from "../data";
import { getVanReviews } from "./index";
import { ValidationError, NotFoundError } from "com/errors";

const { MONGO_URI, MONGO_DB_TEST } = process.env;

describe("getVanReviews", () => {
  before(() => {
    return data.connect(MONGO_URI!, MONGO_DB_TEST!);
  });

  beforeEach(() => {
    return Promise.all([
      User.deleteMany({}),
      Van.deleteMany({}),
      Review.deleteMany({}),
    ]);
  });

  it("returns sanitized reviews with average rating", async () => {
    const user = await User.create({
      name: "Marc",
      lastName: "Castellet",
      email: "marc@test.com",
      password: "123123123",
      location: new Types.ObjectId(),
    });

    const author = await User.create({
      name: "Anna",
      lastName: "Puig",
      email: "anna@test.com",
      password: "123123123",
      location: new Types.ObjectId(),
    });

    const review1 = await Review.create({
      rating: 4,
      comment: "Perfecte!",
      author: author._id,
    });

    const review2 = await Review.create({
      rating: 2,
      comment: "Justet",
      author: author._id,
    });

    const van = await Van.create({
      model: "California",
      brand: "VW",
      price: 300,
      location: new Types.ObjectId(),
      owner: user._id,
      reviews: [review1._id, review2._id],
      windows: 2,
      doors: 3,
      bedCount: 2,
      fuelType: "diesel",
    });

    const result = await getVanReviews(user._id.toString(), van._id.toString());

    expect(result).to.have.property("averageRating", 3);
    expect(result.reviews).to.be.an("array").with.lengthOf(2);
    expect(result.reviews[0]).to.have.property("comment");
    expect(result.reviews[0].author).to.have.property("name", "Anna");
  });

  it("returns empty reviews array and null averageRating if no reviews", async () => {
    const user = await User.create({
      name: "Marc",
      lastName: "Castellet",
      email: "marc@test.com",
      password: "123123123",
      location: new Types.ObjectId(),
    });

    const van = await Van.create({
      model: "Ford Nugget",
      brand: "Ford",
      price: 270,
      location: new Types.ObjectId(),
      owner: user._id,
      reviews: [],
      windows: 2,
      doors: 3,
      bedCount: 2,
      fuelType: "diesel",
    });

    const result = await getVanReviews(user._id.toString(), van._id.toString());

    expect(result.reviews).to.be.an("array").with.lengthOf(0);
    expect(result.averageRating).to.equal(null);
  });

  it("throws NotFoundError if user does not exist", async () => {
    const fakeUserId = new Types.ObjectId().toString();
    const fakeVanId = new Types.ObjectId().toString();

    try {
      await getVanReviews(fakeUserId, fakeVanId);
      throw new Error("Expected to throw");
    } catch (err) {
      expect(err).to.be.instanceOf(NotFoundError);
      expect((err as Error).message).to.equal("user not found");
    }
  });

  it("throws NotFoundError if van does not exist", async () => {
    const user = await User.create({
      name: "Marc",
      lastName: "Test",
      email: "marc2@test.com",
      password: "123123123",
      location: new Types.ObjectId(),
    });

    const fakeVanId = new Types.ObjectId().toString();

    try {
      await getVanReviews(user._id.toString(), fakeVanId);
      throw new Error("Expected to throw");
    } catch (err) {
      expect(err).to.be.instanceOf(NotFoundError);
      expect((err as Error).message).to.equal("van not found");
    }
  });

  it("throws ValidationError on invalid userId or vanId", async () => {
    try {
      await getVanReviews("invalid-id", "also-invalid");
      throw new Error("Expected to throw");
    } catch (err) {
      expect(err).to.be.instanceOf(ValidationError);
      expect((err as Error).message).to.include("invalid");
    }
  });

  afterEach(() => {
    return Promise.all([
      User.deleteMany({}),
      Van.deleteMany({}),
      Review.deleteMany({}),
    ]);
  });

  after(() => {
    return data.disconnect();
  });
});
