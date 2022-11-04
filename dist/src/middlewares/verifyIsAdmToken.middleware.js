"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyIsAdmTokenMiddleware = (request, response, next) => {
    if (!request.user.administrador) {
        return response.status(403).json({ messagem: 'Usuário não autorizado' });
    }
    return next();
};
exports.default = verifyIsAdmTokenMiddleware;
//# sourceMappingURL=verifyIsAdmToken.middleware.js.map