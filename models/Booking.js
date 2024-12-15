const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    packageId: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    phone: String,
    travelers: Number,
    specialRequests: String,
    totalPrice: Number,
});

module.exports = mongoose.model('Booking', bookingSchema);
