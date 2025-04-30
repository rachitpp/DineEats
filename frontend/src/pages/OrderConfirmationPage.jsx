import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.order;
  const userData = location.state?.user;

  useEffect(() => {
    if (!orderData) {
      navigate("/");
    }

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [orderData, navigate]);

  if (!orderData || !userData) {
    return null; // Will redirect if no order
  }

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-gradient-to-b from-[#f8f9fa] to-[#eef0f2] min-h-screen py-12 px-4">
      <motion.div
        className="max-w-2xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
          variants={itemVariants}
        >
          {/* Success Header */}
          <div className="bg-gradient-to-r from-[#27ae60] to-[#2ecc71] p-8 text-white text-center">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-white text-[#27ae60] rounded-full mb-4 shadow-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <motion.h1
              className="text-4xl font-extrabold mb-2"
              variants={itemVariants}
            >
              Order Confirmed!
            </motion.h1>
            <motion.p
              className="text-white/90 font-medium text-lg max-w-md mx-auto"
              variants={itemVariants}
            >
              Thank you, {userData.name}! Your delicious meal is being prepared
              and will be ready for pickup soon.
            </motion.p>
          </div>

          <div className="p-8">
            {/* Order Details Card */}
            <motion.div
              className="bg-[#f9f9f9] rounded-xl p-6 mb-8 border-l-4 border-[#27ae60] shadow-sm"
              variants={itemVariants}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#27ae60] rounded-full flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#333]">
                  Order Details
                </h2>
              </div>

              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-medium text-gray-500">Order ID</span>
                  <span className="font-mono font-semibold bg-gray-100 px-3 py-1 rounded text-[#333]">
                    {orderData.id}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-medium text-gray-500">Date & Time</span>
                  <span className="font-semibold">
                    {formatDate(orderData.createdAt)}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-medium text-gray-500">Status</span>
                  <span className="capitalize bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {orderData.status}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-1">
                  <span className="font-bold text-[#333]">Total Amount</span>
                  <span className="text-xl font-extrabold text-[#27ae60]">
                    ${orderData.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Order Items */}
            <motion.div className="mb-8" variants={itemVariants}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#27ae60] rounded-full flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#333]">Your Order</h2>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <div className="grid grid-cols-5 text-sm font-semibold text-gray-500">
                    <div className="col-span-3">Item</div>
                    <div className="text-center">Qty</div>
                    <div className="text-right">Price</div>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {orderData.items.map((item, index) => (
                    <motion.div
                      key={index}
                      className="p-4 hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="grid grid-cols-5 items-center">
                        <div className="col-span-3">
                          <p className="font-semibold text-[#333]">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                        <div className="text-center font-medium">
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="text-right font-bold text-[#333]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex justify-end items-center">
                    <span className="font-semibold text-gray-600 mr-4">
                      Total:
                    </span>
                    <span className="text-xl font-extrabold text-[#27ae60]">
                      ${orderData.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pickup Info */}
            <motion.div
              className="bg-gradient-to-r from-[#27ae60] to-[#2ecc71] p-6 rounded-xl text-white mb-8 shadow-sm"
              variants={itemVariants}
            >
              <div className="flex items-center mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h2 className="text-xl font-bold">Pickup Information</h2>
              </div>
              <p className="text-white/90 ml-8">
                Please bring your{" "}
                <span className="font-semibold underline">Order ID</span> or{" "}
                <span className="font-semibold underline">Phone Number</span>{" "}
                when you come to pick up your order.
              </p>
              <div className="ml-8 mt-3 text-sm bg-white/20 p-3 rounded-lg">
                <p>Your order will be ready in approximately 20-30 minutes.</p>
                <p className="mt-1">
                  For any questions, please call us at:{" "}
                  <span className="font-semibold">(555) 123-4567</span>
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <Link
                to="/"
                className="bg-[#27ae60] hover:bg-[#2ecc71] text-white font-semibold px-6 py-3.5 rounded-xl transition duration-300 text-center shadow-sm hover:shadow-md flex-1 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Menu
              </Link>
              <Link
                to="/order-history"
                className="bg-[#27ae60] hover:bg-[#2ecc71] text-white font-semibold px-6 py-3.5 rounded-xl transition duration-300 text-center shadow-sm hover:shadow-md flex-1 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
                View Order History
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Feedback Prompt */}
        <motion.div
          className="mt-8 text-center text-gray-500 bg-white p-4 rounded-xl shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <p>Enjoying DineEats? Rate your experience!</p>
          <div className="flex justify-center mt-2 space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                className="text-gray-300 hover:text-[#27ae60] focus:outline-none transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmationPage;
