import { expect } from "chai";
import sinon from "sinon";
import { Types } from "mongoose";
import { getVanLocation } from "./getVanLocation";
import { Van } from "../data";
import { NotFoundError, SystemError, ValidationError } from "com/errors";

describe("getVanLocation", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("returns location object if van is found", async () => {
    const fakeVanId = new Types.ObjectId().toString();
    const fakeUserId = new Types.ObjectId().toString();
    const expectedLocation = { city: "Barcelona", country: "Spain" };

    sinon.stub(Van, "findById").returns({
      lean: () =>
        Promise.resolve({ _id: fakeVanId, location: expectedLocation }),
    } as any);

    const result = await getVanLocation(fakeUserId, fakeVanId);
    expect(result).to.deep.equal(expectedLocation);
  });

  it("throws NotFoundError if van is not found", async () => {
    const fakeVanId = new Types.ObjectId().toString();
    const fakeUserId = new Types.ObjectId().toString();

    sinon.stub(Van, "findById").returns({
      lean: () => Promise.resolve(null),
    } as any);

    try {
      await getVanLocation(fakeUserId, fakeVanId);
      throw new Error("Should have thrown NotFoundError");
    } catch (err) {
      expect(err).to.be.instanceOf(NotFoundError);
      expect((err as Error).message).to.equal("van not found");
    }
  });

  it("throws SystemError if findById throws", async () => {
    const fakeVanId = new Types.ObjectId().toString();
    const fakeUserId = new Types.ObjectId().toString();

    sinon.stub(Van, "findById").throws(new Error("DB error"));

    try {
      await getVanLocation(fakeUserId, fakeVanId);
      throw new Error("Should have thrown SystemError");
    } catch (err) {
      expect(err).to.be.instanceOf(SystemError);
      expect((err as Error).message).to.equal("DB error");
    }
  });

  it("throws ValidationError if userId is invalid", async () => {
    const invalidUserId = "not-valid";
    const validVanId = new Types.ObjectId().toString();

    try {
      await getVanLocation(invalidUserId, validVanId);
      throw new Error("Should have thrown ValidationError");
    } catch (err) {
      expect(err).to.be.instanceOf(ValidationError);
    }
  });
});
