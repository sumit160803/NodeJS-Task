const fs = require('fs');

const MAX_REQUESTS_PER_MINUTE = 20;
const MAX_REQUESTS_PER_SECOND = 1;
const TASK_PROCESS_INTERVAL = 1000;

const taskQueue = {};
const overflowQueue = {};
const userRequestCounts = {};
const userTaskTimestamps = {};

const addTaskToQueue = async (userID) => {
    const now = Date.now();
    const minuteStart = Math.floor(now / 60000) * 60000;

    if (!userRequestCounts[userID]) {
        userRequestCounts[userID] = { count: 0, timestamp: minuteStart };
        userTaskTimestamps[userID] = [];
    }

    const userRequestData = userRequestCounts[userID];
    const userTimestamps = userTaskTimestamps[userID];

    if (now - userRequestData.timestamp >= 60000) {
        userRequestData.count = 0;
        userRequestData.timestamp = minuteStart;
    }

    if (userRequestData.count < MAX_REQUESTS_PER_MINUTE) {
        if (userTimestamps.length === 0 || (now - userTimestamps[userTimestamps.length - 1]) >= 1000) {
            userRequestData.count += 1;
            userTimestamps.push(now);

            if (userTimestamps.length > MAX_REQUESTS_PER_SECOND) {
                userTimestamps.shift();
            }

            if (!taskQueue[userID]) {
                taskQueue[userID] = [];
            }
            taskQueue[userID].push(() => task(userID));
            await processing(userID);
        } else {
            if (!overflowQueue[userID]) {
                overflowQueue[userID] = [];
            }
            overflowQueue[userID].push(() => task(userID));
        }
    } else {
        if (!overflowQueue[userID]) {
            overflowQueue[userID] = [];
        }
        overflowQueue[userID].push(() => task(userID));
    }
};

const processing = async (userID) => {
    if (taskQueue[userID]?.length === 0) {
        if (overflowQueue[userID]?.length > 0) {
            taskQueue[userID] = overflowQueue[userID];
            overflowQueue[userID] = [];
            await processing(userID);
        }
        return;
    }

    const currentTask = taskQueue[userID].shift();

    setTimeout(async () => {
        await currentTask();
        await processing(userID);
    }, TASK_PROCESS_INTERVAL);
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
