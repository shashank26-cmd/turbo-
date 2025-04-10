const express = require('express');
const { createBooking, getBookings, getBookingById, deleteBooking, getInvoice } = require('../controllers/bookingController.js');
const router = express.Router();

router.get('/bookings', getBookings);
router.get('/bookings/:id', getBookingById);
router.delete('/bookings/:id', deleteBooking);
router.post('/booking/create', createBooking);
router.post('/invoice/:id', getInvoice);

module.exports = router;
