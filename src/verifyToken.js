const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Check for token in header
    const token = req.header('authorization');
    if (!token) return res.status(401).send('Access denied.');

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        // Add _id(user.id) and iat (timestamp) to req.user
        req.user = verified;
        next();

    } catch (error) {
        res.status(403).send('Invalid token.');
    }
}
