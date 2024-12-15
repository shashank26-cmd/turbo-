const express = require('express');
const {
    getPackages,
    createPackage,
    updatePackage,
    deletePackage,
    getPackageById,
} = require('../controllers/packageController');

const router = express.Router();

router.get('/packages', getPackages); // Get all packages
router.get('/packages/:id', getPackageById); // Get package by ID
router.post('/admin/packages', createPackage); // Create a new package
router.put('/admin/packages/:id', updatePackage); // Update a package by ID
router.delete('/admin/packages/:id', deletePackage); // Delete a package by ID

module.exports = router;