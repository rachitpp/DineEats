import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { createOrder } from "../services/api";

const CartPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animateItems, setAnimateItems] = useState(false);

  const cartItems = cart.items || [];

  useEffect(() => {
    // Trigger animation for cart items
    setTimeout(() => {
      setAnimateItems(true);
    }, 100);
  }, []);

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
      setError("Your cart is empty. Add some items before placing an order.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const orderData = {
        name: customerInfo.name,
        phone: customerInfo.phone,
        address: customerInfo.address,
        items: cartItems,
        totalAmount: totalPrice,
      };

      const response = await createOrder(orderData);
      clearCart();
      navigate("/order-confirmation", {
        state: { order: response.order, user: response.user },
      });
    } catch (err) {
      console.error("Error placing order:", err);
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#f8f9fa] to-[#edf0f2] min-h-screen py-8 bg-texture">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex mb-4">
            <span className="bg-[#27ae60]/10 text-[#27ae60] text-sm font-semibold px-3 py-1 rounded-full">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
              cart
            </span>
          </div>
          <h1 className="text-5xl font-extrabold text-[#1a1a1a] mb-4 tracking-tight">
            Your <span className="text-gradient">Cart</span>
          </h1>
          <p className="text-gray-700 text-base font-medium max-w-xl mx-auto">
            Review your items and complete your order to enjoy our delicious
            food.
          </p>
        </div>

        {/* Content */}
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-10 text-center max-w-md mx-auto menu-item-appear">
            <div className="text-7xl mb-6 floating">🛒</div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items yet. Explore our menu to
              find something delicious!
            </p>
            <Link
              to="/"
              className="inline-block bg-[#27ae60] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#219653] hover:shadow-md transition-all transform hover:-translate-y-1"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6 overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#1a1a1a]">
                    Order Items
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y">
                  {cartItems.map((item, index) => (
                    <div
                      key={item._id}
                      className="menu-item-appear"
                      style={{
                        opacity: animateItems ? 1 : 0,
                        transform: animateItems
                          ? "translateY(0)"
                          : "translateY(20px)",
                        transition: `all 0.4s ease-out ${index * 0.1}s`,
                      }}
                    >
                      <CartItem item={item} />
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                  <Link
                    to="/"
                    className="flex items-center text-[#27ae60] hover:text-[#219653] font-semibold"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Continue Shopping
                  </Link>

                  <div className="text-xl font-bold text-[#1a1a1a]">
                    Total:{" "}
                    <span className="text-[#27ae60]">
                      ₹{totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">
                  Order Summary
                </h2>

                <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between py-2 text-gray-700 font-medium">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 text-gray-700 font-medium">
                    <span>Delivery Fee</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between py-3 mt-2 border-t border-gray-200 text-lg font-bold text-[#2c3e50]">
                    <span>Total</span>
                    <span className="text-[#27ae60]">
                      ₹{totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Customer Form */}
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={customerInfo.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27ae60] focus:border-[#27ae60] outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27ae60] focus:border-[#27ae60] outline-none transition-all"
                        placeholder="555-123-4567"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                      >
                        Delivery Address
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={customerInfo.address}
                        onChange={handleInputChange}
                        required
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27ae60] focus:border-[#27ae60] outline-none resize-none transition-all"
                        placeholder="123 Main St, City, State"
                      ></textarea>
                    </div>
                  </div>

                  {/* Security note */}
                  <div className="mt-4 flex items-center text-xs text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Your information is secure and encrypted
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg font-medium text-sm">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full mt-6 bg-[#27ae60] text-white font-semibold py-3 rounded-lg hover:bg-[#219653] hover:shadow-md transition-all transform hover:-translate-y-1"
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
