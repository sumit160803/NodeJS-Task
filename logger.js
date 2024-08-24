const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../log/log.txt');

const error = (message) => {
    fs.appendFile(logFile, `ERROR: ${message}\n`, (err) => {
        if (err) console.error('Failed to write log:', err);
    });
};

const info = (message) => {
    fs.appendFile(logFile, `INFO: ${message}\n`, (err) => {
        if (err) console.error('Failed to write log:', err);
    });
};

module.exports = {
    error,
    info
};
