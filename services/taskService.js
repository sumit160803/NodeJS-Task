const fs = require('fs');
const redisClient = require('../utils/redisClient');

const taskQueue = {};

const addTaskToQueue = async (userID) => {
    if (!taskQueue[userID]) {
        taskQueue[userID] = [];
    }
    taskQueue[userID].push(() => task(userID));
    await processing(userID);
};

const processing = async (userID) => {
    if (taskQueue[userID].length === 0) return; // No tasks to process

    const currentTask = taskQueue[userID].shift();

    // Process 1 task per second
    setTimeout(async () => {
        await currentTask();
        await processing(userID);
    }, 1000);
};

const task = async (userID) => {
    const message = `${userID}-task completed at-${Date.now()} \n`;
    console.log(message);

    try {
        await fs.promises.appendFile('log/log.txt', message);
    } catch (err) {
        console.log('Failed to write task log:', err);
    }
};

module.exports = {
    addTaskToQueue
};
