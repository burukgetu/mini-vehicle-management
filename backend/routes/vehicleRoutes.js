const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// API Endpoints
router.post('/', vehicleController.addVehicle);
router.put('/:id', vehicleController.updateVehicleStatus);
router.get('/', vehicleController.getAllVehicles);
router.delete('/:id', vehicleController.deleteVehicle);

module.exports = router;