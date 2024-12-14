/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AlignJustify, Plus, SquarePen, Trash2 } from "lucide-react";
import { useSidebar } from "./SidebarContext";

const App = () => {
  const [Loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [vehicleForm, setVehicleForm] = useState({ name: "", status: "" });
  const { isOpen, toggleSidebar } = useSidebar();

  axios.interceptors.request.use(
    (request) => {
      console.log("Axios Request:", request); // Logs the entire request (headers, body, URL, etc.)
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Fetch vehicles on load
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await axios.get("/api/vehicles");
      setVehicles(res.data);
    } catch (error) {
      toast.error("Failed to fetch vehicles");
    }
  };

  const handleAddOrEdit = async () => {
    try {
      if (editMode) {
        const res = await axios.put(
          `/api/vehicles/${currentVehicle._id}`,
          vehicleForm
        );
        setVehicles((prev) =>
          prev.map((v) => (v._id === currentVehicle._id ? res.data : v))
        );
        toast.success("Vehicle updated successfully");
        console.log(res.data)
      } else {
        const res = await axios.post("/api/vehicles", vehicleForm);
        setVehicles([...vehicles, res.data]);
        toast.success("Vehicle added successfully");
      }
      closeModal();
    } catch (error) {
      toast.error("Failed to save vehicle", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
  
    // Format time (e.g., "9:36 AM")
    const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
  
    // Calculate days ago
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
    const daysAgo = diffInDays === 0
      ? "today"
      : diffInDays === 1
      ? "yesterday"
      : `${diffInDays} days ago`;
  
    return `${formattedTime} (${daysAgo})`;
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      setLoading(true);
      try {
        const res = await axios.delete(`/api/vehicles?id=${id}`);
        // console.log(res.data);
        setModalOpen(false);
        toast.success("Vehicle deleted successfully");
        setVehicles((prev) => prev.filter((v) => v._id !== id));
      } catch (error) {
        setModalOpen(false);
        toast.error("Failed to delete vehicle");
      } finally {
        setLoading(false); // Re-enable the icon
      }
    } else {
      setModalOpen(false);
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
    <div className="min-h-screen w-full bg-gray-100 px-3 py-4 md:p-8 md:pt-6">
      <ToastContainer />

    <div className="flex gap-3 items-center md:mt-0 mb-6">
      <button 
        onClick={toggleSidebar}
        className="bg-gray-200 rounded-md my-3 md:my-0 py-1 px-3 hover:bg-gray-300 hover:cursor-pointer"
      >
        <AlignJustify /> 
      </button>
      <h1 className="text-2xl md:text-3xl font-bold">Vehicle Management Dashboard</h1>
    </div>
      <div className="mb-6">
        <button
          onClick={() => openModal()}
          className="bg-blue-500 hover:bg-blue-700 flex text-white pr-4 pl-2 gap-1 py-2 rounded"
        >
          <Plus/> Add Vehicle
        </button>
      </div>

      <table className="table-auto border-collapse w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="text-left px-4 py-2">Vehicle Name</th>
            <th className="text-left px-4 py-2">Status</th>
            <th className="text-center px-4 py-2">Last Updated</th>
            <th className="text-center px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle._id} onClick={() => openModal(vehicle)} className=" hover:bg-gray-100 hover:cursor-pointer">
              <td className="text-left px-5 py-2">{vehicle.name}</td>
              <td 
                className={`text-left px-4 py-2 text-white`}
              >
                <span className={`py-1 px-3 rounded-md ${vehicle.status === "active" ? "bg-green-200 text-green-600" : vehicle.status === "maintenance" ? "bg-yellow-200 text-yellow-600" : "bg-red-500"}`}>
                  {vehicle.status}
                </span>
              </td>
              <td className="text-center px-4 py-2" title={new Date(vehicle.lastUpdated).toLocaleString()}>
                {/* {new Date(vehicle.lastUpdated).toLocaleString()} */}
                {formatDate(vehicle.lastUpdated)}
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
                  { Loading ? <button disabled={Loading}><Trash2 color="red"/></button>  : <Trash2 color="red"/> }
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