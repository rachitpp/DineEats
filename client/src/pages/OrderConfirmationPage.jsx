import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.order;
  const userData = location.state?.user;

  // If someone navigates directly to this page without order data, redirect to home
  useEffect(() => {
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  if (!orderData || !userData) {
    return null; // Will redirect in the useEffect
  }

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Order Placed Successfully!</h1>
          <p className="text-gray-600 mt-2">Thank you for your order, {userData.name}</p>
        </div>

        <div className="border-t border-b py-4 mb-6">
          <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span>{orderData.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order Date:</span>
              <span>{formatDate(orderData.createdAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="capitalize">{orderData.status}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total Amount:</span>
              <span>${orderData.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Order Items</h2>
          <div className="space-y-3">
            {orderData.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500 text-sm">${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded mb-6">
          <h2 className="text-lg font-semibold mb-2">Pickup Information</h2>
          <p className="text-gray-600">Your order will be ready for pickup soon. Please show your order ID or phone number when you arrive.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center">
            Back to Menu
          </Link>
          <Link to="/order-history" className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-center">
            View Order History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
