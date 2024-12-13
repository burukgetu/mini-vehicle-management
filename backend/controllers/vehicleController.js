const Vehicle = require('../models/vehicle');

// Add a new vehicle
exports.addVehicle = async (req, res) => {
  const { name, status } = req.body;
  try {
    const vehicle = new Vehicle({ name, status });
    await vehicle.save();
    console.log("Vehicle Added.")
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add vehicle', error: err.message });
  }
};

// Update vehicle status
exports.updateVehicleStatus = async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      id,
      { name, status, lastUpdated: Date.now() },
      { new: true }
    );
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    console.log("Vehicle status updated succesfully.")
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update vehicle', error: err.message });
  }
};

// Fetch all vehicles
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    console.log("Get All Vehicles.")
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch vehicles', error: err.message });
  }
};

// Delete vehicle by ID
exports.deleteVehicle = async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await Vehicle.findByIdAndDelete(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    console.log("Vehicle deleted successfully.");
    res.json({ message: 'Vehicle deleted successfully', vehicle });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete vehicle', error: err.message });
  }
};