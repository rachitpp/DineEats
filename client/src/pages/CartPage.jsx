import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { createOrder } from '../services/api';

const CartPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get cart items from the cart object
  const cartItems = cart.items || [];

  // Calculate total price of items in cart
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      setError('Your cart is empty. Add some items before placing an order.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const orderData = {
        customer: customerInfo,
        items: cartItems,
        totalAmount: totalPrice,
      };

      const response = await createOrder(orderData);
      clearCart();
      navigate('/order-confirmation', { state: { order: response } });
    } catch (err) {
      console.error('Error placing order:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-8">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#2c3e50] mb-3">Your Cart</h1>
          <p className="text-gray-600">
            Review your items and complete your order
          </p>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center max-w-md mx-auto">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-[#2c3e50] mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link 
              to="/menu" 
              className="btn btn-primary inline-block"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#2c3e50] mb-4">Order Items</h2>
                
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <CartItem key={item._id} item={item} />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-[#2c3e50] mb-4">Order Summary</h2>
                
                <div className="mb-6">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="flex justify-between py-2 text-lg font-bold">
                    <span className="text-[#2c3e50]">Total</span>
                    <span className="text-[#ff6b35]">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={customerInfo.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-[#ff6b35] outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-[#ff6b35] outline-none transition-colors"
                        placeholder="555-123-4567"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Address
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={customerInfo.address}
                        onChange={handleInputChange}
                        required
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-[#ff6b35] outline-none transition-colors"
                        placeholder="123 Main St, Apt 4B, City, State, ZIP"
                      ></textarea>
                    </div>
                  </div>
                  
                  {error && (
                    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                      {error}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    className="btn btn-primary w-full mt-6"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      "Place Order"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
