# Node.js Task Management Application

## Overview

The task was to process the tasks for users and applying rate limits to control the number of requests each user can make. And finally write logs to file.

## Project Structure

  - `controllers/taskController.js`: Contains logic for handling API requests related to tasks.
  - `middlewares/rateLimitMiddleware.js`: Configures rate-limiting middleware to restrict API requests.
  - `services/taskService.js`: Manages task processing and logging.
  - `utils/redisClient.js`: Sets up and exports the Redis client.
  - `app.js`: Main application file that sets up the Express server and middleware.
  - `logger.js`: Provides logging utility functions.

- `log/`: Directory for storing log files (e.g., `log.txt`).

- `package.json`: Lists project dependencies and scripts.

- `.gitignore`: Specifies files and directories to be ignored by Git (e.g., `node_modules/`).

## Assumptions

1. **Environment Setup**: The project is created in NodeJS. So, having NodeJS is a must along with postman to test POST method and should have Redis installed.
2. **Log File**: You must have a log file created else an error will be thrown. The automation can be done aswell.

## Instructions to run

1. Clone the repository.
2. Install all dependencies mentioned in `package.json` file.
3. use command `npm start` to run the `index.js`.
4. Now, go to POSTMAN and create a POST request for `http://localhost:4124/api/v1/task`.
5. Enter the json input like `{"user_id": "123"}` and press send.
6. You will receive all appropriate response like 200 or 429.
7. You can check the log.txt file for logs.

## My Learnings:

1. It was my first time using redis. I will surely learn about it more and will use clustering in future projects.
2. Imporved my error handleing skills like uncaught Errors.
3. Improved my Modularization skills.
4. Made me realise my overall standing on NodeJs is 5/10.😓
