import React, { useState } from "react";
import Table from "../components/Table/Table";
import useFetchOrders from "../hooks/useFetchOrders";
import Sidebar from "../components/Sidebar/Sidebar";
import Loader from "../components/loader/Loader";
import { Order } from "../components/Table/Table.types";


const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null); 

  const { orders, loading, error } = useFetchOrders();

  const handleDecisionChange = (id: string, decision: string) => {
    console.log(`Order ${id} decision changed to ${decision}`);
  };

  const handleStatusToggle = (id: string, active: boolean) => {
    console.log(`Order ${id} status toggled to ${active}`);
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order); 
  };

  const closePopup = () => {
    setSelectedOrder(null); 
  };

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <button
        className={`fixed top-4 right-4 px-4 py-2 bg-gray-800 text-white rounded z-50 ${
          isSidebarOpen ? "hidden" : "md:hidden"
        }`}
        onClick={() => setIsSidebarOpen(true)}
      >
        ☰
      </button>

      <div className="flex-1 overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Refund Orders</h1>
          <div className="overflow-x-auto" style={{ maxHeight: "calc(100vh - 64px)", overflowY: "auto" }}>
            <Table
              data={orders}
              onDecisionChange={handleDecisionChange}
              onStatusToggle={handleStatusToggle}
              onViewDetails={handleViewDetails}
            />
          </div>
        </div>
      </div>


      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p><strong>ID:</strong> {selectedOrder.id}</p>
            <p><strong>Reason:</strong> {selectedOrder.reason}</p>
            <p><strong>Store Name:</strong> {selectedOrder.store_name}</p>
            <p><strong>Amount:</strong> ${selectedOrder.amount}</p>
            <p><strong>Items:</strong></p>
            <ul>
              {selectedOrder.items.map((item) => (
                <li key={item.id}>
                  {item.name} - ${item.price} x {item.quantity}
                </li>
              ))}
            </ul>
            <button
              onClick={closePopup}
              className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;