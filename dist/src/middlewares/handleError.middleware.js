"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorMiddleware = void 0;
const AppError_1 = require("../errors/AppError");
const handleErrorMiddleware = (error, req, res, next) => {
    if (error instanceof AppError_1.AppError) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    console.error(error);
    return res.status(500).json("Internal Server Error");
};
exports.handleErrorMiddleware = handleErrorMiddleware;
//# sourceMappingURL=handleError.middleware.js.map