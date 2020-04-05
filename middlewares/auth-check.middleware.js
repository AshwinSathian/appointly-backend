const jwt = require('jsonwebtoken');
const config = require('config');
const logger = require('../logger');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, config.get('JWT_KEY'));
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    if ((new Date(decodedToken.timeStamp).getTime() + 3600 * 1000) < Date.now()) {
        logger.error({
            function: 'auth_check',
            message: 'User authentication expired'
        });
        return res.status(401).json({ message: 'Authentication has timed out. Access denied.' });
    } else {
        logger.info({
            function: 'auth_check',
            message: 'User authenticated verified'
        });
        next();
    }
  } catch (error) {
    logger.error({
        function: 'auth_check',
        message: 'User authentication failed: ' + error
    });
    return res.status(401).json({ message: 'Authentication failed. Access denied' });
  }
};
