const rateLimit = require('express-rate-limit');

const userRateLimit = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 20, // limit each user to 20 requests per minute
    keyGenerator: (req) => req.body.user_id,
    handler: (req, res) => {
        res.status(429).json({ error: 'Too many requests, please try again later.' });
    }
});

module.exports = userRateLimit;
