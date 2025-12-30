const { errorResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        return errorResponse(res, err.message, 400);
    }

    return errorResponse(res, 'Internal Server Error', 500);
};

module.exports = errorHandler;
