// /api/vehicles.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Vehicle from '../models/vehicle'

dotenv.config();

// Connect to MongoDB only once (to avoid reconnecting in every request)
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGO_URI );
};

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const vehicles = await Vehicle.find();
      res.status(200).json(vehicles);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch vehicles', error: err });
    }
  } else if (req.method === 'POST') {
    const { name, status } = req.body;
    try {
      const vehicle = new Vehicle({ name, status });
      await vehicle.save();
      console.log("Vehicle Added.")
      res.status(201).json(vehicle);
    } catch (err) {
      res.status(500).json({ message: 'Failed to add vehicle', error: err.message });
    }
  } else if (req.method === 'PUT') {
    const id = req.body._id;
    const { name, status } = req.body;
    try {
      const updatedVehicle = await Vehicle.findByIdAndUpdate(
        id,
        { name, status },
        { new: true }
      );
      res.status(200).json(updatedVehicle);
    } catch (err) {
      res.status(500).json({ message: 'Failed to update vehicle', error: err });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      const deletedVehicle = await Vehicle.findByIdAndDelete(id);
      if (!deletedVehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
      res.status(200).json(deletedVehicle);
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete vehicle', error: err });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}