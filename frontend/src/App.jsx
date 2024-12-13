/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus, SquarePen, Trash2 } from "lucide-react";

const App = () => {
  const [vehicles, setVehicles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [vehicleForm, setVehicleForm] = useState({ name: "", status: "" });

  // Fetch vehicles on load
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/vehicles");
      setVehicles(res.data);
    } catch (error) {
      toast.error("Failed to fetch vehicles");
    }
  };

  const handleAddOrEdit = async () => {
    try {
      if (editMode) {
        const res = await axios.put(
          `http://localhost:5000/api/vehicles/${currentVehicle._id}`,
          vehicleForm
        );
        setVehicles((prev) =>
          prev.map((v) => (v._id === currentVehicle._id ? res.data : v))
        );
        toast.success("Vehicle updated successfully");
      } else {
        const res = await axios.post("http://localhost:5000/api/vehicles", vehicleForm);
        setVehicles([...vehicles, res.data]);
        toast.success("Vehicle added successfully");
      }
      closeModal();
    } catch (error) {
      toast.error("Failed to save vehicle");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await axios.delete(`http://localhost:5000/api/vehicles/${id}`);
        setVehicles((prev) => prev.filter((v) => v._id !== id));
        toast.success("Vehicle deleted successfully");
      } catch (error) {
        toast.error("Failed to delete vehicle");
      }
    }
  };

  const openModal = (vehicle = null) => {
    setEditMode(!!vehicle);
    setCurrentVehicle(vehicle);
    setVehicleForm(vehicle || { name: "", status: "" });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setVehicleForm({ name: "", status: "" });
    setEditMode(false);
    setCurrentVehicle(null);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 px-3 py-10 md:p-10">
      <ToastContainer />

      <h1 className="text-2xl font-bold mt-6 md:mt-0 mb-6">Vehicle Management Dashboard</h1>

      <div className="mb-6">
        <button
          onClick={() => openModal()}
          className="bg-blue-500 flex text-white pr-4 pl-2 gap-1 py-2 rounded"
        >
          <Plus/> Add Vehicle
        </button>
      </div>

      <table className="table-auto w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="text-center px-4 py-2">Vehicle Name</th>
            <th className="text-center px-4 py-2">Status</th>
            <th className="text-center px-4 py-2">Last Updated</th>
            <th className="text-center px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle._id} className="border-t">
              <td className="text-center px-4 py-2">{vehicle.name}</td>
              <td className="text-center px-4 py-2">{vehicle.status}</td>
              <td className="text-center px-4 py-2">
                {new Date(vehicle.lastUpdated).toLocaleString()}
              </td>
              <td className="text-center flex items-center justify-center px-4 py-2">
                <button
                  onClick={() => openModal(vehicle)}
                  className="text-white py-1 rounded"
                >
                  <SquarePen color="green"/>
                </button>
                <button
                  onClick={() => handleDelete(vehicle._id)}
                  className="text-white px-2 py-1 rounded"
                >
                  <Trash2 color="red"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-[350px] p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              {editMode ? "Edit Vehicle" : "Add Vehicle"}
            </h2>
            <div className="mb-4">
              <label className="block font-medium mb-2">Vehicle Name</label>
              <input
                type="text"
                value={vehicleForm.name}
                onChange={(e) =>
                  setVehicleForm((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Status</label>
              <input
                type="text"
                value={vehicleForm.status}
                onChange={(e) =>
                  setVehicleForm((prev) => ({ ...prev, status: e.target.value }))
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;