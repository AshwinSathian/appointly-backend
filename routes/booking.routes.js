const express = require('express');

const bookingControllers = require('../controllers/booking.controllers');
const authCheck = require('../middlewares/auth-check.middleware');

const router = express.Router();

router.post(
    '/book-appointment', 
    authCheck,
    bookingControllers.checkSlotAvailability,
    bookingControllers.bookAppointment
);

router.get(
    '/get-hosted-appointments/:host', 
    authCheck,
    bookingControllers.getHostedAppointments
);

router.get(
    '/get-guest-appointments/:guest', 
    authCheck,
    bookingControllers.getGuestAppointments
);

router.get(
    '/get-all-appointments/:user', 
    authCheck,
    bookingControllers.getAllAppointments
);

module.exports = router;
