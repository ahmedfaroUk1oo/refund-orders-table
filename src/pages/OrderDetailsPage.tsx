import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Order } from "../components/Table/Table.types";
import Loader from "../components/loader/Loader";
import axios from "axios";

const OrderDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get<Order>(`https://raw.githubusercontent.com/ahmedfaroUk1oo/refund-api/refs/heads/main/db.json/${id}`);
        setOrder(response.data);
      } catch (err) {
        console.error("Failed to fetch order details");
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (!order) return <Loader />;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Order ID: {order.id}</h2>
        <p><strong>Reason:</strong> {order.reason}</p>
        <p><strong>Store Name:</strong> {order.store_name}</p>
        <p><strong>Amount:</strong> ${order.amount}</p>
        <p><strong>Status:</strong> {order.active ? "Active" : "Inactive"}</p>
        <p><strong>Decision:</strong> {order.decision || "Not Yet"}</p>
        <h3 className="text-lg font-semibold mt-4">Items:</h3>
        <ul>
          {order.items.map((item) => (
            <li key={item.id} className="mb-2">
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Price:</strong> ${item.price}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetailsPage;