const basicAuth = require('basic-auth');

// Hardcoded credentials for admin
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123';  

// Authentication logic
const authenticate = (req, res, next) => {
    const user = basicAuth(req);
    if (user.name === ADMIN_USERNAME && user.pass === ADMIN_PASSWORD) {
        return next(); 
    } else {
        res.status(401).send('Unauthorized');  
    }
};

// Redirect to /admin after successful authentication
const login = (req, res) => {
    const user = basicAuth(req);
    if (user && user.name === ADMIN_USERNAME && user.pass === ADMIN_PASSWORD) {
        res.redirect('/admin'); 
    } else {
        res.status(401).send('Unauthorized');
    }
};

module.exports = { authenticate, login };
