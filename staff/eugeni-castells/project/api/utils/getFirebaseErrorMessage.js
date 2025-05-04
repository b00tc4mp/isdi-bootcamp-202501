"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirebaseErrorMessage = getFirebaseErrorMessage;
function getFirebaseErrorMessage(error) {
    var _a, _b;
    try {
        const parsed = JSON.parse(error.response.data);
        return (_b = (_a = parsed === null || parsed === void 0 ? void 0 : parsed.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : "Unknown Firebase error";
    }
    catch (_c) {
        return "Unknown Firebase error";
    }
}
