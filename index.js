const express = require('express');
const rateLimitMiddleware = require('./middlewares/rateLimitMiddleware');
const taskController = require('./controllers/taskController');
const logger = require('./logger');

const PORT = 4124;
const app = express();

app.use(express.json());
app.use('/api/v1/task', rateLimitMiddleware);
app.post('/api/v1/task', taskController.addTask);

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Something went wrong');
});

process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    process.exit(1);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
