import { Car, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSidebar } from "./SidebarContext";

const Sidebar = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const { isOpen, toggleSidebar } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

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

  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div>
      {/* Sidebar Toggle Button (Only for Mobile Screens) */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className={`fixed top-4 z-20 bg-blue-500 text-black px-4 py-2 rounded
            ${isOpen ? 'fixed left-60 bg-transparent' : "hidden"}`}
        >
          {isOpen ? <X/> : ""}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`top-0 h-full z-10 bg-white text-white transform ${
          isMobile
            ? isOpen
              ? "translate-x-0 w-[300px]"
              : "-translate-x-full w-0"
            : isOpen ? "translate-x-0 w-[250px]" : "px-2"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="py-6 flex flex-col items-center">
          <h2 className={`text-2xl text-purple-600 font-bold mb-6 ${isMobile ? isOpen ? "flex" : "hidden" : isOpen ? "" : "bg-purple-200 px-4 text-3xl py-1 rounded-md"}`}
          >
            { isOpen ? "FlEET.io" : "F"}
          </h2>
          <div className="w-[90%]">
              <ul className={`w-full ${
                      location.pathname === "/" ? "bg-purple-100 rounded-md" : ""} hover:bg-slate-200 hover:text-black hover:cursor-pointer`}>
                <li className="flex py-[4px] px-3">
                  <a 
                    href="#" 
                    className={`${
                      location.pathname === "/" ? "text-black" : ""
                    } hover:text-black text-xl ${isMobile ? isOpen ? "flex" : "hidden" : ""}`}
                  >
                    <span className="flex gap-8 items-center">
                      <Car className="text-purple-700"/>
                      <p className={`${isOpen ? "" : "hidden"}`}>Vehicles</p>
                    </span>
                  </a>
                </li>
              </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;