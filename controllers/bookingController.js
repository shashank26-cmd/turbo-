const Booking = require('../models/Booking.js');
const Package = require('../models/Package.js')
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
exports.createBooking = async (req, res) => {
    try {
        const { name, email, phone, travelers, packageId } = req.body;

        // Fetch package details from DB (replace with your model's fetch logic)
        const tourPackage = await Package.findById(packageId);
        const totalPrice = tourPackage.price * travelers;

        // Create a new booking in the database
        const newBooking = new Booking({
            name,
            email,
            phone,
            travelers,
            packageId,
            totalPrice,
        });
        await newBooking.save();

        // Generate PDF with booking details
        const pdfPath = path.resolve(__dirname, `invoice-${newBooking._id}.pdf`);
        const doc = new PDFDocument();

        // Write PDF content
        const writeStream = fs.createWriteStream(pdfPath);
        doc.pipe(writeStream);

        doc.fontSize(20).text('Invoice', { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text(`Name: ${name}`);
        doc.text(`Email: ${email}`);
        doc.text(`Phone: ${phone}`);
        doc.text(`Package: ${tourPackage.title}`);
        doc.text(`Travelers: ${travelers}`);
        doc.text(`Total Price: $${totalPrice}`);
        doc.end();

        // Wait until the file is fully written
        writeStream.on('finish', () => {
            res.status(201).json({
                message: 'Booking created successfully!',
                bookingId: newBooking._id,
                pdfUrl: `/invoices/invoice/${newBooking._id}`,
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error while creating booking');
    }
};

// Endpoint to serve the generated PDF
exports.getInvoice = (req, res) => {
    const { bookingId } = req.params;
    const pdfPath = path.resolve(__dirname, `invoice-${bookingId}.pdf`);
    if (fs.existsSync(pdfPath)) {
        // Set headers for file download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=invoice-${bookingId}.pdf`);
        res.sendFile(pdfPath); // This sends the file to the client
    } else {
        res.status(404).send('Invoice not found');
    }
};


// Fetch all bookings
exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};

// Fetch a single booking by ID
exports.getBookingById = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking', error });
    }
};

// Delete a booking by ID
exports.deleteBooking = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBooking = await Booking.findByIdAndDelete(id);
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking', error });
    }
};
