const authService = require('./auth.service');
const { registerSchema, loginSchema } = require('./auth.validation');
const { successResponse, errorResponse } = require('../../utils/response');

const register = async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return errorResponse(res, error.details[0].message, 400);
        }

        const user = await authService.register(req.body);
        return successResponse(res, { userId: user.id, email: user.email }, 'User registered successfully', 201);
    } catch (err) {
        return errorResponse(res, err.message, 400);
    }
};

const login = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return errorResponse(res, error.details[0].message, 400);
        }

        const { user, token } = await authService.login(req.body);
        return successResponse(res, { token, user: { id: user.id, email: user.email, role: user.role } }, 'Login successful');
    } catch (err) {
        return errorResponse(res, err.message, 401);
    }
};

module.exports = {
    register,
    login,
};
