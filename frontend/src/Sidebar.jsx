import { AlignRight, X } from "lucide-react";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Consider screens <768px as mobile
    };

    handleResize(); // Initialize on component mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Sidebar Toggle Button (Only for Mobile Screens) */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className={`fixed top-4 z-20 bg-blue-500 text-white px-4 py-2 rounded shadow
            ${isOpen ? 'fixed left-60 bg-transparent' : "left-4"}`}
        >
          {isOpen ? <X/> : <AlignRight/>}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`top-0 h-full z-10 bg-gray-800 text-white transform ${
          isMobile
            ? isOpen
              ? "translate-x-0 w-[300px]"
              : "-translate-x-full w-0"
            : "translate-x-0 w-[300px]"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="py-6 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <ul className="w-full hover:bg-slate-200 hover:text-black hover:cursor-pointer">
            <li className="flex py-[4px] justify-center">
              <a href="#" className="hover:bg-slate-200 hover:text-black text-xl">
                Vehicles
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;