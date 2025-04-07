// components/CartDrawer.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useContext(CartContext);

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose} />}
      <motion.div
        className="cart-drawer"
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3 }}
      >
        <h2>🛒 Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-details">
                    <h4>{item.name}</h4>
                    <div className="cart-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <FiTrash2 className="cart-remove" onClick={() => removeFromCart(item.id)} />
                </div>
              ))}
            </div>
            <div className="cart-footer">
              <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
              <button className="checkout-btn" onClick={() => clearCart()}>Checkout</button>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
};

export default CartDrawer;
