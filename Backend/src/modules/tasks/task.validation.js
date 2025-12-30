const Joi = require('joi');

const createTaskSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().optional(),
    status: Joi.string().valid('PENDING', 'IN_PROGRESS', 'COMPLETED').optional(),
});

const updateTaskSchema = Joi.object({
    title: Joi.string().min(3).optional(),
    description: Joi.string().optional(),
    status: Joi.string().valid('PENDING', 'IN_PROGRESS', 'COMPLETED').optional(),
});

module.exports = {
    createTaskSchema,
    updateTaskSchema,
};
