import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGetOrders } from "../../api/orders";
import type { OrderHistoryItem } from "../../types/orders";

export const OrdersPage = () => {
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGetOrders()
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h1>Order History</h1>

      {!orders.length && <p>No orders yet.</p>}

      {orders.map((o) => (
        <div key={o._id} style={{ padding: 12, border: "1px solid #ddd", borderRadius: 10, marginBottom: 10 }}>
          <div><b>{o.orderNumber}</b></div>
          <div>Date: {new Date(o.createdAt).toLocaleDateString()}</div>
          <div>Total: {o.totalAmount.toFixed(2)} €</div>
          <div>Status: {o.status}</div>
          <Link to={o._id}>View details</Link>
        </div>
      ))}
    </div>
  );
};
