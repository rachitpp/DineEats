import React, { useState } from 'react';
import { getOrdersByPhone } from '../services/api';

const OrderHistoryPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!phoneNumber.trim()) {
      setError('Please enter a valid phone number');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const data = await getOrdersByPhone(phoneNumber);
      setOrders(data);
      setSearched(true);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to fetch orders. Please try again.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="bg-[#f8f9fa] min-h-screen py-8">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#2c3e50] mb-3">Order History</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Enter your phone number to view your past orders
          </p>
        </div>
        
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm p-6 mb-8">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="flex-grow px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-[#ff6b35] outline-none transition-colors"
              required
            />
            <button 
              type="submit"
              className="btn btn-primary whitespace-nowrap"
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
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 mb-2 border-4 border-[#ff6b35] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[#2c3e50] font-medium">Loading your orders...</p>
            </div>
          </div>
        ) : searched && orders.length === 0 ? (
          <div className="bg-yellow-50 text-yellow-700 p-6 rounded-lg text-center max-w-xl mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="font-medium">No orders found</p>
            <p className="mt-2 text-sm">We couldn't find any orders associated with this phone number.</p>
          </div>
        ) : orders.length > 0 ? (
          <div className="mt-6 space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden animate-fade-in">
                <div className="bg-[#2c3e50] text-white px-6 py-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">Order #{order.id}</h3>
                    <span className="text-sm">{formatDate(order.createdAt)}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="font-medium text-[#2c3e50] mb-2">Customer Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 text-sm">
                      <div><span className="font-medium">Name:</span> {order.customer?.name}</div>
                      <div><span className="font-medium">Phone:</span> {order.customer?.phone}</div>
                      {order.customer?.address && (
                        <div className="sm:col-span-2"><span className="font-medium">Address:</span> {order.customer.address}</div>
                      )}
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-[#2c3e50] mb-2">Items</h4>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 text-[#2c3e50] text-sm">
                        <tr>
                          <th className="py-3 px-4">Item</th>
                          <th className="py-3 px-4">Quantity</th>
                          <th className="py-3 px-4">Price</th>
                          <th className="py-3 px-4">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {order.items?.map((item, index) => (
                          <tr key={index} className="text-gray-700">
                            <td className="py-3 px-4 font-medium">{item.name}</td>
                            <td className="py-3 px-4">{item.quantity}</td>
                            <td className="py-3 px-4">${parseFloat(item.price).toFixed(2)}</td>
                            <td className="py-3 px-4">${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50 font-medium text-[#2c3e50]">
                        <tr>
                          <td colSpan="3" className="py-3 px-4 text-right">Total:</td>
                          <td className="py-3 px-4 text-[#ff6b35]">${parseFloat(order.totalAmount).toFixed(2)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  
                  <div className="mt-4 text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' 
                        ? 'bg-green-100 text-green-800' 
                        : order.status === 'Processing' 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status || 'Processing'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
