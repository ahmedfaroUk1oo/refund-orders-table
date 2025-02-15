import { useState, useEffect } from "react";
import { Order } from "../components/Table/Table.types";
import axios from "axios";

const useFetchOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<{ orders: Order[] }>(
          "https://raw.githubusercontent.com/ahmedfaroUk1oo/refund-api/refs/heads/main/db.json"
        );
        const data = response.data.orders; 
        setOrders(data);
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error };
};

export default useFetchOrders;