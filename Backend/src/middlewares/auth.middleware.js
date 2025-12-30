const { verifyToken } = require('../utils/jwt');
const { errorResponse } = require('../utils/response');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return errorResponse(res, 'Unauthorized: No token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
        return errorResponse(res, 'Unauthorized: Invalid token', 401);
    }

    req.user = decoded;
    next();
};

module.exports = authenticate;
