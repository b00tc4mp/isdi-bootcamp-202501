"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVanById = void 0;
const com_1 = require("com");
const data_1 = require("../data");
const errors_1 = require("com/errors");
const deleteFileFromFirebase_1 = require("../utils/deleteFileFromFirebase");
const deleteVanById = (userId, vanId) => {
    com_1.validate.id(userId, "user id");
    com_1.validate.id(vanId, "van Id");
    return (() => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        let user;
        try {
            user = yield data_1.User.findById(userId);
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        if (!user)
            throw new errors_1.NotFoundError("user not found");
        let van;
        try {
            van = yield data_1.Van.findById(vanId)
                .populate({ path: "trips", select: "confirmStatus startDate endDate" })
                .lean();
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        if (!van)
            throw new errors_1.NotFoundError("van not found");
        let tripsToDelete = [];
        try {
            const pendingTrips = yield data_1.Trip.find({
                van: van._id,
                confirmStatus: "pending",
            }).select("_id");
            tripsToDelete = pendingTrips.map((t) => t._id);
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        const imagePaths = (_b = (_a = van.images) === null || _a === void 0 ? void 0 : _a.map((img) => img.path)) !== null && _b !== void 0 ? _b : [];
        try {
            if (imagePaths.length > 0) {
                yield (0, deleteFileFromFirebase_1.deleteImagesFromFirebase)(imagePaths);
            }
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        try {
            yield Promise.all([
                data_1.Van.deleteOne({ _id: van._id }),
                data_1.User.updateOne({ _id: user._id }, { $pull: { vans: van._id } }),
                data_1.User.updateMany({ trips: { $in: tripsToDelete } }, { $pull: { trips: { $in: tripsToDelete } } }),
                data_1.Trip.deleteMany({ _id: { $in: tripsToDelete } }),
            ]);
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
    }))();
};
exports.deleteVanById = deleteVanById;
