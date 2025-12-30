const taskService = require('./task.service');
const { createTaskSchema, updateTaskSchema } = require('./task.validation');
const { successResponse, errorResponse } = require('../../utils/response');

const createTask = async (req, res) => {
    try {
        const { error } = createTaskSchema.validate(req.body);
        if (error) return errorResponse(res, error.details[0].message, 400);

        const task = await taskService.createTask(req.user.id, req.body);
        return successResponse(res, task, 'Task created successfully', 201);
    } catch (err) {
        return errorResponse(res, err.message, 500);
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await taskService.getTasks(req.user);
        return successResponse(res, tasks, 'Tasks retrieved successfully');
    } catch (err) {
        return errorResponse(res, err.message, 500);
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await taskService.getTaskById(req.user, req.params.id);
        if (!task) return errorResponse(res, 'Task not found', 404);
        return successResponse(res, task, 'Task retrieved successfully');
    } catch (err) {
        if (err.message === 'Unauthorized') return errorResponse(res, 'Unauthorized', 403);
        return errorResponse(res, err.message, 500);
    }
};

const updateTask = async (req, res) => {
    try {
        const { error } = updateTaskSchema.validate(req.body);
        if (error) return errorResponse(res, error.details[0].message, 400);

        const task = await taskService.updateTask(req.user, req.params.id, req.body);
        return successResponse(res, task, 'Task updated successfully');
    } catch (err) {
        if (err.message === 'Task not found') return errorResponse(res, 'Task not found', 404);
        if (err.message === 'Unauthorized') return errorResponse(res, 'Unauthorized', 403);
        return errorResponse(res, err.message, 500);
    }
};

const deleteTask = async (req, res) => {
    try {
        await taskService.deleteTask(req.user, req.params.id);
        return successResponse(res, null, 'Task deleted successfully');
    } catch (err) {
        if (err.message === 'Task not found') return errorResponse(res, 'Task not found', 404);
        if (err.message === 'Unauthorized') return errorResponse(res, 'Unauthorized', 403);
        return errorResponse(res, err.message, 500);
    }
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
