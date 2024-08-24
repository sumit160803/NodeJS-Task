const taskService = require('../services/taskService');

const addTask = async (req, res) => {
    const userID = req.body.user_id;

    if (!userID) return res.status(400).json({ error: 'No user ID provided' });

    try {
        await taskService.addTaskToQueue(userID);
        res.json({ message: 'Task added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add task' });
    }
};

module.exports = {
    addTask
};
