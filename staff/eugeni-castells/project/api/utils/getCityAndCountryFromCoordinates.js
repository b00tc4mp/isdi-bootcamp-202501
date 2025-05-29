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
exports.getCityCountryFromCoords = void 0;
const getCityCountryFromCoords = (latitude, longitude) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${latitude}${longitude >= 0 ? "+" : ""}${longitude}/nearbyCities?limit=1`;
    const response = yield fetch(url, {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
    });
    if (!response.ok) {
        throw new Error(`GeoDB API request failed: ${response.statusText}`);
    }
    const data = yield response.json();
    if (!((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.length)) {
        throw new Error("No location found for the given coordinates");
    }
    const nearest = data.data[0];
    return {
        city: nearest.city,
        country: nearest.country,
    };
});
exports.getCityCountryFromCoords = getCityCountryFromCoords;
