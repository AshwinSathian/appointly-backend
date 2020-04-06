const jwt = require('jsonwebtoken');
const config = require('config');
const logger = require('../logger');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, config.get('JWT_KEY'));
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    logger.error({
        function: 'auth_check',
        message: 'User authentication failed: ' + error
    });
    return res.status(401).json({ message: 'Authentication failed. Access denied' });
  }
};
