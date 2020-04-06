const express = require('express');

const authControllers = require('../controllers/auth.controllers');
const bookingControllers = require('../controllers/booking.controllers');
const authCheck = require('../middlewares/auth-check.middleware');

const router = express.Router();

router.post(
    '/book-appointment', 
    authCheck,
    bookingControllers.checkSlotAvailability,
    bookingControllers.resolveUserMame,
    bookingControllers.bookAppointment
);

router.put(
    '/update-appointment/:id', 
    authCheck,
    bookingControllers.checkSlotAvailability,
    bookingControllers.resolveUserMame,
    bookingControllers.updateAppointment
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

router.get(
    '/booking-details/:user',
    authCheck,
    authControllers.fetchUserInfo,
    bookingControllers.fetchBookings
);

router.delete(
    '/delete-appointment/:id', 
    authCheck,
    bookingControllers.deleteAppointment
);

module.exports = router;
