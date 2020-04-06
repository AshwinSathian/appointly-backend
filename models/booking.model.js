const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    guest: { type: String, required: true },
    guestMail: { type: String, required: true },
    host: { type: String, required: true },
    hostMail: { type: String, required: true },
    date: { type: String, required: true },
    slot: { type: Number, required: true },
    note: { type: String }
});

module.exports = mongoose.model('Booking', bookingSchema);
