const express = require('express');
const bodyParser = require('body-parser');
const packageRoutes = require('./routes/packageRoute');
const bookingRoutes = require('./routes/bookingRoute');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoute');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/",(req,res)=>{
    res.send("pong")
})

// Routes
app.use('/api/packages', packageRoutes); // Routes for package-related API
app.use('/api/bookings', bookingRoutes); // Routes for booking-related API
app.use(authRoutes);
app.get('/admin', (req, res) => {
    res.send('Welcome to the Admin Dashboard');
});
app.use('/invoices', express.static(path.join(__dirname, 'downloads')));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
