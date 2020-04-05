const logger = require('../logger');

const Booking = require('../models/booking.model');

exports.checkSlotAvailability = (req, res, next) => {
    Booking
    .findOne({
        guest: req.body.guest,
        host: req.body.guest,
        date: req.body.date,
        slot: req.body.slot
    })
    .then(existingBooking => {
        if (existingBooking) {
            logger.error({
                function: 'check_slot_availability',
                message: 'The requested slot is already taken'
            });
            return res.status(401).jsonp({
                message: 'The requested slot is already booked. Please pick a different slot.'
            });
        } else {
            logger.info({
                function: 'check_slot_availability',
                message: 'The requested slot is available'
            });
            next();
        }
    })
    .catch(error => {
        logger.error({
            function: 'check_slot_availability',
            message: 'Failed to verify slot availability' + error
        });
        return res.status(500).jsonp({
            message: 'Internal Server Error. Please try again.'
        });
    });
};

exports.bookAppointment = (req, res, next) => {
    const newAppointment = new Booking({
        guest: req.body.guest,
        host: req.body.host,
        date: req.body.date,
        slot: req.body.slot,
        note: req.body.note
    });

    newAppointment
    .save()
    .then(savedAppointment => {
        logger.info({
            function: 'book_appointment',
            message: 'Appointment successfully booked'
        });
        res.status(200).jsonp({
            message: 'Appointment successfully booked',
            details: savedAppointment
        });
    })
    .catch(error => {
        logger.error({
            function: 'book_appointment',
            message: 'Appointment booking failed: ' + error
        });
        res.status(500).jsonp({
            message: 'Internal server error. Please try again.'
        });
    });
};

exports.getHostedAppointments = (req, res, next) => {
    console.log(req.params.host)
    Booking
    .find({ host: req.params.host })
    .then(appointments => {
        logger.info({
            function: 'get_hosted_appointments',
            message: 'Appointments hosted by user successfully fetched',
        });
        res.status(200).jsonp({
            message: 'Hosted appointment successfully fetched',
            hostedAppointments: appointments
        });
    })
    .catch(error => {
        logger.error({
            function: 'get_hosted_appointments',
            message: 'Fetching hosted appointments failed: ' + error
        });
        res.status(500).jsonp({
            message: 'Internal server error. Please try again.'
        });
    });
};

exports.getGuestAppointments = (req, res, next) => {
    Booking
    .find({ guest: req.params.guest })
    .then(appointments => {
        logger.info({
            function: 'get_guest_appointments',
            message: 'Appointments to be attended by user successfully fetched',
        });
        res.status(200).jsonp({
            message: 'Guest appointment successfully fetched',
            guestAppointments: appointments
        });
    })
    .catch(error => {
        logger.error({
            function: 'get_guest_appointments',
            message: 'Fetching guest appointments failed: ' + error
        });
        res.status(500).jsonp({
            message: 'Internal server error. Please try again.'
        });
    });
};

exports.getAllAppointments = (req, res, next) => {
    Booking
    .find({ $or: [{ guest: req.params.user }, { host: req.params.user }] })
    .then(appointments => {
        logger.info({
            function: 'get_all_appointments',
            message: 'All appointments of user successfully fetched'
        });
        res.status(200).jsonp({
            message: 'All appointments of user successfully fetched',
            appointments
        });
    })
    .catch(error => {
        logger.error({
            function: 'get_all_appointments',
            message: 'Fetching all appointments failed: ' + error
        });
        res.status(500).jsonp({
            message: 'Internal server error. Please try again.'
        });
    });
};
