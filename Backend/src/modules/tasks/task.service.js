const prisma = require('../../config/db');

const createTask = async (userId, data) => {
    return await prisma.task.create({
        data: {
            ...data,
            userId,
        },
    });
};

const getTasks = async (user) => {
    if (user.role === 'ADMIN') {
        return await prisma.task.findMany({ include: { user: { select: { name: true, email: true } } } });
    }
    return await prisma.task.findMany({ where: { userId: user.id } });
};

const getTaskById = async (user, taskId) => {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return null;

    if (user.role !== 'ADMIN' && task.userId !== user.id) {
        throw new Error('Unauthorized');
    }

    return task;
};

const updateTask = async (user, taskId, data) => {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) throw new Error('Task not found');

    if (user.role !== 'ADMIN' && task.userId !== user.id) {
        throw new Error('Unauthorized');
    }

    return await prisma.task.update({
        where: { id: taskId },
        data,
    });
};

const deleteTask = async (user, taskId) => {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) throw new Error('Task not found');

    if (user.role !== 'ADMIN' && task.userId !== user.id) {
        throw new Error('Unauthorized');
    }

    return await prisma.task.delete({ where: { id: taskId } });
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
