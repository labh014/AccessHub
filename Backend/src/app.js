const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');
const errorHandler = require('./middlewares/error.middleware');

const authRoutes = require('./modules/auth/auth.routes');
const taskRoutes = require('./modules/tasks/task.routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.send('AccessHub Backend is running');
});

app.use(errorHandler);

module.exports = app;
