import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetOrderById } from "../../api/orders";
import type { OrderDetails } from "../../types/orders";
import './OrderDetails.scss';

export const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    apiGetOrderById(id)
      .then(setOrder)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container">Loading...</div>;
  if (!order) return <div className="container">Order not found</div>;

  return (
    <div className="container">
      <h1>{order.orderNumber}</h1>
      <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
      <p>Total: {order.totalAmount.toFixed(2)} €</p>
      <p>Status: {order.status}</p>

      <h2>Items</h2>
      {order.items.map((i) => (
        <div key={i.productId} className="order-info">
          <img src={i.imageUrl} alt={i.title} className="order-info-img" />
          <div style={{ flex: 1 }}>
            <div><b>{i.title}</b></div>
            <div>{i.quantity} × {i.price.toFixed(2)} €</div>
          </div>
          <div><b>{(i.quantity * i.price).toFixed(2)} €</b></div>
        </div>
      ))}
    </div>
  );
};
