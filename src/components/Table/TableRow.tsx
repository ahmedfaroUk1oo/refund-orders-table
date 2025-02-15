import React, { useState } from "react";
import { Order } from "./Table.types";
import { toast } from "react-toastify";

interface TableRowProps {
  order: Order;
  onDecisionChange: (id: string, decision: string) => void;
  onStatusToggle: (id: string, active: boolean) => void;
  onViewDetails: (order: Order) => void; 
}

const TableRow: React.FC<TableRowProps> = ({ order, onDecisionChange, onStatusToggle, onViewDetails }) => {
  const [decision, setDecision] = useState(order.decision || "Not Yet");
  const [status, setStatus] = useState(order.active);

  const handleDecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDecision = e.target.value;
    setDecision(newDecision);
    onDecisionChange(order.id, newDecision);
    toast.success(`The decision has been changed to: ${newDecision}`);
  };

  const handleStatusToggle = () => {
    const newStatus = !status;
    setStatus(newStatus);
    onStatusToggle(order.id, newStatus);
    toast.success(`The status has been toggled to: ${newStatus ? "Active" : "Inactive"}`);
  };

  return (
    <tr className="border-b">
      <td className="py-2 px-4">{order.id}</td>
      <td className="py-2 px-4">{order.reason}</td>
      <td className="py-2 px-4">{order.store_name}</td>
      <td className="py-2 px-4">
        <img src={order.store_logo} alt="Store Logo" className="w-10 h-10 rounded-full" />
      </td>
      <td className="py-2 px-4">${order.amount}</td>
      <td className="py-2 px-4">{order.items.length} items</td>
      <td className="py-2 px-4">
        <select value={decision} onChange={handleDecisionChange} className="border p-1 rounded cursor-pointer">
          <option value="Not Yet">Not Yet</option>
          <option value="reject">Reject</option>
          <option value="accept">Accept</option>
          <option value="escalate">Escalate</option>
        </select>
      </td>
      <td className="py-2 px-4">
        <label className="switch ">
          <input type="checkbox" className="cursor-pointer" checked={status} onChange={handleStatusToggle} />
          <span className="slider round"></span>
        </label>
      </td>
      <td className="py-2 px-4">
        <button onClick={() => onViewDetails(order)} className="text-blue-500 hover:text-blue-700">
          View Details
        </button>
      </td>
    </tr>
  );
};

export default TableRow;