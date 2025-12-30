const { errorResponse } = require('../utils/response');

const authorize = (requiredRole) => {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) {
            return errorResponse(res, 'Forbidden: Insufficient permissions', 403);
        }
        next();
    };
};

module.exports = authorize;
