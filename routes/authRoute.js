const express = require('express');
const { authenticate, login } = require('../controllers/authController');

const router = express.Router();

router.get('/login', login);
router.use('/admin', authenticate);

module.exports = router;
