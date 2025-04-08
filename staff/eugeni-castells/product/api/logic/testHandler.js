import "dotenv/config.js";
import { data, User, Post } from "../data/index.js";
import { describe } from "mocha";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);

const { MONGO_URL, MONGO_DB_TEST } = process.env;

export const testHandler = (description, test) => {
  describe(description, () => {
    before(() => data.connect(MONGO_URL, MONGO_DB_TEST));

    beforeEach(() => Promise.all([User.deleteMany({}), Post.deleteMany({})]));

    test.map((test) => it(test.name, test));

    afterEach(() => Promise.all([User.deleteMany({}), Post.deleteMany({})]));

    after(() => data.disconnect());
  });
};
