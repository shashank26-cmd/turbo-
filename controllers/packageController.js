const Package = require('../models/Package.js');

// Fetch all packages
exports.getPackages = async (req, res) => {
    try {
        const packages = await Package.find();
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching packages', error });
    }
};

exports.getPackageById = async (req, res) => {
    const { id } = req.params;
        try {
            const package = await Package.findById(id);
            if (!package) {
                return res.status(404).json({ message: 'package not found' });
            }
            res.json(package);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching booking', error });
        }
};

// Create a new package
exports.createPackage = async (req, res) => {
    try {
        const newPackage = await Package.create(req.body);
        res.status(201).json(newPackage);
    } catch (error) {
        res.status(400).json({ message: 'Error creating package', error });
    }
};

// Update a package by ID
exports.updatePackage = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPackage = await Package.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Validate the updated fields
        });
        if (!updatedPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.json(updatedPackage);
    } catch (error) {
        res.status(400).json({ message: 'Error updating package', error });
    }
};

// Delete a package by ID
exports.deletePackage = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPackage = await Package.findByIdAndDelete(id);
        if (!deletedPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.json({ message: 'Package deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting package', error });
    }
};
