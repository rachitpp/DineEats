import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOrdersByPhone } from "../services/api";

const OrderHistoryPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Animate items after initial load
  useEffect(() => {
    if (orders.length > 0) {
      setTimeout(() => {
        setAnimateItems(true);
      }, 100);
    }
  }, [orders]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phoneNumber.trim()) {
      setError("Please enter a valid phone number");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setAnimateItems(false);
      const data = await getOrdersByPhone(phoneNumber);
      setOrders(data);
      setSearched(true);
      // Reset selected order
      setSelectedOrder(null);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders. Please try again.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gradient-to-b from-[#f8f9fa] to-[#edf0f2] min-h-screen py-10 bg-texture">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex mb-4">
            <span className="bg-[#27ae60]/10 text-[#27ae60] text-sm font-semibold px-3 py-1 rounded-full">
              Order Tracking
            </span>
          </div>
          <h1 className="text-5xl font-extrabold text-[#1a1a1a] mb-3">
            Your <span className="text-gradient">Order History</span>
          </h1>
          <p className="text-gray-700 text-base font-medium max-w-xl mx-auto">
            Track and view details of all your previous orders with ease
          </p>
        </div>

        {/* Phone Number Form */}
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 mb-10 menu-item-appear">
          <h2 className="text-xl font-bold text-[#2c3e50] mb-4">
            Find Your Orders
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div className="relative flex-grow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27ae60] focus:border-[#27ae60] outline-none text-gray-800 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#27ae60] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#219653] hover:shadow-md transition-all transform hover:-translate-y-1 whitespace-nowrap"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Searching...
                </div>
              ) : (
                "Find Orders"
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 mb-3 border-4 border-[#27ae60] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[#2c3e50] font-semibold text-lg">
                Loading your orders...
              </p>
            </div>
          </div>
        )}

        {/* No Orders */}
        {searched && !loading && orders.length === 0 && (
          <div className="bg-yellow-50 text-yellow-700 p-8 rounded-xl text-center max-w-xl mx-auto shadow-md menu-item-appear">
            <svg
              className="h-16 w-16 mx-auto mb-4 text-yellow-400 floating"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="text-2xl font-bold mb-2">No Orders Found</h3>
            <p className="mt-1 text-base max-w-md mx-auto">
              We couldn't find any orders for this phone number. Try checking
              the number or place your first order!
            </p>
            <Link
              to="/"
              className="inline-block mt-6 bg-yellow-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-yellow-600 transition-all"
            >
              Browse Menu
            </Link>
          </div>
        )}

        {/* Orders List */}
        {orders.length > 0 && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {orders.map((order, index) => (
                <div
                  key={order.id}
                  className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 cursor-pointer ${
                    selectedOrder === order.id
                      ? "ring-2 ring-[#27ae60]"
                      : "hover:shadow-lg"
                  }`}
                  style={{
                    opacity: animateItems ? 1 : 0,
                    transform: animateItems
                      ? "translateY(0)"
                      : "translateY(20px)",
                    transition: `all 0.5s ease-out ${index * 0.1}s`,
                  }}
                  onClick={() =>
                    setSelectedOrder(
                      selectedOrder === order.id ? null : order.id
                    )
                  }
                >
                  <div
                    className={`px-6 py-4 flex justify-between items-center transition-colors duration-300 ${
                      selectedOrder === order.id
                        ? "bg-[#27ae60] text-white"
                        : "bg-[#2c3e50] text-white"
                    }`}
                  >
                    <h3 className="font-bold text-lg">Order #{order.id}</h3>
                    <span className="text-sm opacity-90">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="mb-5">
                      <h4 className="font-semibold text-[#1a1a1a] mb-2 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Customer Info
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">
                        <div>
                          <strong>Name:</strong> {order.customer?.name}
                        </div>
                        <div>
                          <strong>Phone:</strong> {order.customer?.phone}
                        </div>
                        {order.customer?.address && (
                          <div className="sm:col-span-2">
                            <strong>Address:</strong> {order.customer.address}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-[#1a1a1a] flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        Items Ordered
                      </h4>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "processing"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status || "Processing"}
                      </span>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        selectedOrder === order.id
                          ? "max-h-[500px]"
                          : "max-h-20"
                      }`}
                    >
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-gray-50 text-[#2c3e50] font-semibold">
                            <tr>
                              <th className="py-3 px-4">Item</th>
                              <th className="py-3 px-4">Qty</th>
                              <th className="py-3 px-4">Price</th>
                              <th className="py-3 px-4">Subtotal</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {order.items?.map((item, index) => (
                              <tr key={index} className="text-gray-700">
                                <td className="py-3 px-4 font-medium">
                                  {item.name}
                                </td>
                                <td className="py-3 px-4">{item.quantity}</td>
                                <td className="py-3 px-4">
                                  ₹{parseFloat(item.price).toFixed(2)}
                                </td>
                                <td className="py-3 px-4">
                                  ₹{(item.price * item.quantity).toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="bg-gray-50 font-semibold">
                            <tr>
                              <td colSpan="3" className="py-3 px-4 text-right">
                                Total:
                              </td>
                              <td className="py-3 px-4 text-[#27ae60]">
                                ₹{parseFloat(order.totalAmount).toFixed(2)}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(
                            selectedOrder === order.id ? null : order.id
                          );
                        }}
                        className="text-sm text-gray-600 hover:text-[#27ae60] font-medium transition-colors"
                      >
                        {selectedOrder === order.id
                          ? "Hide Details"
                          : "View Details"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
