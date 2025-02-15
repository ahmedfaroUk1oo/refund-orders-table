import React from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`max-md:fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-200 ease-in-out`}
    >
      <button onClick={onClose} className="md:hidden mb-4 text-white">
        ✕
      </button>

      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul>
        <li className="mb-2">
          <a href="#" className="hover:text-gray-400">
            Orders
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="hover:text-gray-400">
            Settings
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;