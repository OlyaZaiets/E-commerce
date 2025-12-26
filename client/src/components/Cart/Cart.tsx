import './Cart.scss';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { apiCheckout } from '../../api/orders';

export const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
  try {
    const { orderId } = await apiCheckout();
  navigate(`/account/orders/${orderId}`);

  } catch (e: any) {
    alert(e.message || "Checkout failed");
  }
};

  const total = cart.reduce(
  (sum, item) => sum + item.productId.price * item.quantity,
  0
  );

  return (
    <div className='container cart-page'>
      <div className='cart-page'>
        <h1>Your Cart</h1>

        {cart.map(item => (
          <div key={item.productId._id} className='cart-item'>
            <img src={item.productId.imageUrl} /> 

            <h3>{item.productId.title}</h3>

            <p>{item.productId.price} €</p>

            <div className='quantity-box'>
              <button 
                onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                disabled={item.quantity === 1}
              >-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}>+</button>
            </div>

            <p className='item-total'>{(item.productId.price * item.quantity).toFixed(2)} €</p>

            <button 
              className='remove-btn' 
              onClick={() => removeFromCart(item.productId._id)}
            >
              Remove
            </button>
          </div>
        ))}

        <div className='cart-summary'>
          <p className='summary-total'>
            Total: <span>{total.toFixed(2)} €</span>
          </p>

          <button 
            className='checkout-btn'
            onClick={handleCheckout} 
            disabled={!cart.length}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};
