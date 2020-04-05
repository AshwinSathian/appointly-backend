const express = require('express');

const authControllers = require('../controllers/auth.controllers');

const router = express.Router();

router.post(
    '/signup', 
    authControllers.createUser
);

router.post(
    '/login', 
    authControllers.login
);

module.exports = router;
