"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVansHandler = void 0;
const createHandler_1 = __importDefault(require("../middlewares/createHandler"));
const index_1 = require("../service/index");
exports.getVansHandler = (0, createHandler_1.default)((req, res) => {
    const { userId } = req;
    const { longitude, latitude, startDate, endDate, travellers } = req.query;
    let parsedLongitude = null;
    if (longitude) {
        parsedLongitude = JSON.parse(longitude);
    }
    let parsedLatitude = null;
    if (latitude) {
        parsedLatitude = JSON.parse(latitude);
    }
    const parsedLocation = longitude !== null && latitude !== null
        ? [parsedLongitude, parsedLatitude]
        : [null, null];
    let parsedStartDate = null;
    if (startDate) {
        parsedStartDate = new Date(startDate);
    }
    let parsedEndDate = null;
    if (startDate) {
        parsedEndDate = new Date(endDate);
    }
    const parsedDateRange = {
        start: parsedStartDate,
        end: parsedEndDate,
    };
    let parsedTravellers = null;
    if (travellers) {
        parsedTravellers = JSON.parse(travellers);
    }
    return (0, index_1.getVans)(userId, parsedLocation, parsedDateRange).then((vans) => {
        res.json(vans);
    });
});
