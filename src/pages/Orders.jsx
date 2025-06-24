
import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  
  const fetchAllOrders = async () => {
    if (!token) {
      console.log("No token available");
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {}, // keep this if the endpoint requires an empty object
        {
          headers: {
            Authorization: `Bearer ${token}`, // Most common format
            // or if your API expects different format:
            // token: token
          },
        }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
const statusHandler = async (event, orderId) => {
  try {
    // Verify token exists before making request
    if (!token) {
      toast.error('Authentication token missing');
      return;
    }

    const response = await axios.post(
      `${backendUrl}/api/order/status`,
      { orderId, status: event.target.value },
      { 
        headers: {
          Authorization: `Bearer ${token}` // More standard format
        }
      }
    );

    if (response.data.success) {
      await fetchAllOrders();
      toast.success('Status updated successfully');
    }
  } catch (error) {
    console.error('Status update failed:', error);
    
    // Handle different error cases
    if (error.response) {
      // Server responded with error status
      if (error.response.status === 401) {
        toast.error('Session expired - please login again');
        // Consider redirecting to login
      } else {
        toast.error(error.response.data.message || 'Update failed');
      }
    } else if (error.request) {
      // Request was made but no response
      toast.error('Network error - please try again');
    } else {
      // Other errors
      toast.error('An unexpected error occurred');
    }
  }
};

  useEffect(() => {
    fetchAllOrders();
  }, [token]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Order Page
          </h3>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
        </div>

        {/* Orders Container */}
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m0 0v5h2v-5m0 0V9a2 2 0 012-2h2a2 2 0 012 2v4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Found</h3>
              <p className="text-gray-500">Orders will appear here once available.</p>
            </div>
          ) : (
            orders.map((order, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden">
                <div className="p-6">
                  {/* Order Header with Icon */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                      <img src={assets.parcel_icon} alt="Package" className="w-10 h-10 rounded-full filter  bg-transparent" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        Order #{index + 1}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        {currency}{order.amount}
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mb-6">
                    <h5 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                      Order Items
                    </h5>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      {order.items.map((item, index) => {
                        if (index === order.items.length - 1) {
                          return (
                            <p key={index} className="flex justify-between items-center text-sm">
                              <span className="text-gray-700">
                                {item.name} X {item.quantity}
                              </span>
                              <span className="bg-white px-2 py-1 rounded text-xs font-medium text-gray-600 border">
                                Size-{item.size}
                              </span>
                            </p>
                          );
                        } else {
                          return (
                            <p key={index} className="flex justify-between items-center text-sm border-b border-gray-200 pb-2">
                              <span className="text-gray-700">
                                {item.name} X {item.quantity}
                              </span>
                              <span className="bg-white px-2 py-1 rounded text-xs font-medium text-gray-600 border">
                                Size-{item.size}
                              </span>
                            </p>
                          );
                        }
                      })}
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h5 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                        Customer Details
                      </h5>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <p className="font-medium text-gray-900">
                          {order.address.firstName + " " + order.address.lastName}
                        </p>
                        <p className="text-sm text-gray-600">{order.address.phone}</p>
                        <p className="text-sm text-gray-600">{order.address.email}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                        Shipping Address
                      </h5>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-1">
                        <p className="text-sm text-gray-700">
                          {order.address.street + ", "}
                        </p>
                        <p className="text-sm text-gray-700">
                          {order.address.city +
                            ", " +
                            order.address.state +
                            ", " +
                            order.address.zipcode +
                            ", " +
                            order.address.country}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary and Status */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500 block">Items</span>
                        <span className="font-medium text-gray-900">{order.items.length}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Method</span>
                        <span className="font-medium text-gray-900">{order.paymentMethod}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Payment</span>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          order.payment 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {order.payment ? 'Done' : 'Pending'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Date</span>
                        <span className="font-medium text-gray-900">
                          {new Date(order.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Status Selector */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Order Status:</span>
                    <select onChange={(event)=>statusHandler(event, order._id)} value={order.status} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 min-w-[180px]">
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;