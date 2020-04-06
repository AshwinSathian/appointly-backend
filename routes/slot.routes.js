const express = require('express');

const slotControllers = require('../controllers/slot.controllers');
const authCheck = require('../middlewares/auth-check.middleware');

const router = express.Router();

router.get(
    '/active-slots', 
    authCheck,
    slotControllers.getActiveSlots
);

router.post(
    '/update-slots', 
    authCheck,
    slotControllers.updateActiveSlots
);

module.exports = router;
