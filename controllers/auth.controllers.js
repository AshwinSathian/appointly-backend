const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../logger');
const config = require('config');

const User = require('../models/user.model');

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(passwordHash => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        slug: req.body.email.split('@')[0],
        password: passwordHash
    });
    user
      .save()
      .then(result => {
          logger.info({
            function: 'create_user',
            message: 'User successfully registered'
          });
          res.status(201).jsonp({
            message: 'User successfully registered',
            userId: result._id
          });
      })
      .catch(err => {
        logger.info({
            function: 'create_user',
            message: 'User registration failed due to invalid credentials. ' + err
        });
        res.status(500).jsonp({
          message: 'User registration failed due to an internal server error'
        });
      });
  });
};

exports.login = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      logger.error({
          function: 'user_login',
          message: 'User with email ' + req.body.email + ' does not exist'
      });
      return res.status(401).jsonp({
          message: 'User with email ' + req.body.email + ' does not exist'
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      logger.error({
          function: 'user_login',
          message: 'Incorrect passowrd. Authentication failed'
      });
      return res.status(401).jsonp({
          message: 'Incorrect passowrd. Authentication failed'
      });
    }
    const token = jwt.sign(
      { 
        email: fetchedUser.email, 
        userId: fetchedUser._id
      },
      config.get('JWT_KEY'),
      { expiresIn: '1h' }
    );
    logger.info({
      function: 'user_login',
      message: 'User with email ' + fetchedUser.email + ' sucessfully logged in'
    });
    res.status(200).json({
      message: 'User with email ' + fetchedUser.email + ' sucessfully logged in. Login expires in 1 hour.',
      token,
      expiresIn: 3600,
      userId: fetchedUser._id,
      userEmail: fetchedUser.email
    });
  })
  .catch(err => {
      logger.error({
          function: 'user_login',
          message: 'Internal server error occured: ' + err
      });
    return res.status(401).json({
      message: 'Internal server error occured'
    });
  });
};

exports.fetchUserInfo = (req, res, next) => {
  User
  .findOne({ slug: req.params.user })
  .then(fetchedUser => {
    if (fetchedUser) {
      req.locals = {};
      req.locals.name = fetchedUser.name;
      req.locals.email = fetchedUser.email;
      req.locals.slots = fetchedUser.slots;
      logger.info({
        function: 'fetch_user_info',
        message: 'Details of user with email ' + fetchedUser.email + ' sucessfully fetched'
      });
      next();
    } else {
      logger.error({
        function: 'fetch_user_info',
        message: 'User with email ' + fetchedUser.email + ' not found'
      });
      res.status(401).jsonp({
        message: 'User with email ' + fetchedUser.email + ' not found'
      });
    }
  })
  .catch(error => {
    logger.error({
      function: 'fetch_user_info',
      message: 'Failed to fetch information: ' + error
    });
    res.status(500).jsonp({
      message: 'Internal server error. Please try again.'
    });
  });
}
