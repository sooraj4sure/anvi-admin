
// import React from "react";
// import { useEffect } from "react";
// import axios from "axios";
// import { backendUrl, currency } from "../App";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import { assets } from "../assets/assets";

// const Orders = ({ token }) => {
//   const [orders, setOrders] = useState([]);
  
//   const fetchAllOrders = async () => {
//     if (!token) {
//       console.log("No token available");
//       return null;
//     }
//     try {
//       const response = await axios.post(
//         backendUrl + "/api/order/list",
//         {}, // keep this if the endpoint requires an empty object
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Most common format
//             // or if your API expects different format:
//             // token: token
//           },
//         }
//       );
//       if (response.data.success) {
//         setOrders(response.data.orders);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };
  
// const statusHandler = async (event, orderId) => {
//   try {
//     // Verify token exists before making request
//     if (!token) {
//       toast.error('Authentication token missing');
//       return;
//     }

//     const response = await axios.post(
//       `${backendUrl}/api/order/status`,
//       { orderId, status: event.target.value },
//       { 
//         headers: {
//           Authorization: `Bearer ${token}` // More standard format
//         }
//       }
//     );

//     if (response.data.success) {
//       await fetchAllOrders();
//       toast.success('Status updated successfully');
//     }
//   } catch (error) {
//     console.error('Status update failed:', error);
    
//     // Handle different error cases
//     if (error.response) {
//       // Server responded with error status
//       if (error.response.status === 401) {
//         toast.error('Session expired - please login again');
//         // Consider redirecting to login
//       } else {
//         toast.error(error.response.data.message || 'Update failed');
//       }
//     } else if (error.request) {
//       // Request was made but no response
//       toast.error('Network error - please try again');
//     } else {
//       // Other errors
//       toast.error('An unexpected error occurred');
//     }
//   }
// };

//   useEffect(() => {
//     fetchAllOrders();
//   }, [token]);
  
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 md:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//             Order Page
//           </h3>
//           <div className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
//         </div>

//         {/* Orders Container */}
//         <div className="space-y-6">
//           {orders.length === 0 ? (
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
//               <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//                 <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m0 0v5h2v-5m0 0V9a2 2 0 012-2h2a2 2 0 012 2v4" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Found</h3>
//               <p className="text-gray-500">Orders will appear here once available.</p>
//             </div>
//           ) : (
//             orders.map((order, index) => (
//               <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden">
//                 <div className="p-6">
//                   {/* Order Header with Icon */}
//                   <div className="flex items-start gap-4 mb-6">
//                     <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
//                       <img src={assets.parcel_icon} alt="Package" className="w-10 h-10 rounded-full filter  bg-transparent" />
//                     </div>
//                     <div className="flex-1">
//                       <h4 className="text-lg font-semibold text-gray-900 mb-1">
//                         Order #{index + 1}
//                       </h4>
//                       <p className="text-sm text-gray-500">
//                         {new Date(order.date).toLocaleDateString('en-US', {
//                           year: 'numeric',
//                           month: 'long',
//                           day: 'numeric'
//                         })}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-2xl font-bold text-gray-900">
//                         {currency}{order.amount}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Order Items */}
//                   <div className="mb-6">
//                     <h5 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
//                       Order Items
//                     </h5>
//                     <div className="bg-gray-50 rounded-lg p-4 space-y-2">
//                       {order.items.map((item, index) => {
//                         if (index === order.items.length - 1) {
//                           return (
//                             <p key={index} className="flex justify-between items-center text-sm">
//                               <span className="text-gray-700">
//                                 {item.name} X {item.quantity}
//                               </span>
//                               <span className="bg-white px-2 py-1 rounded text-xs font-medium text-gray-600 border">
//                                 Size-{item.size}
//                               </span>
//                             </p>
//                           );
//                         } else {
//                           return (
//                             <p key={index} className="flex justify-between items-center text-sm border-b border-gray-200 pb-2">
//                               <span className="text-gray-700">
//                                 {item.name} X {item.quantity}
//                               </span>
//                               <span className="bg-white px-2 py-1 rounded text-xs font-medium text-gray-600 border">
//                                 Size-{item.size}
//                               </span>
//                             </p>
//                           );
//                         }
//                       })}
//                     </div>
//                   </div>

//                   {/* Customer Information */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                     <div>
//                       <h5 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
//                         Customer Details
//                       </h5>
//                       <div className="bg-gray-50 rounded-lg p-4 space-y-2">
//                         <p className="font-medium text-gray-900">
//                           {order.address.firstName + " " + order.address.lastName}
//                         </p>
//                         <p className="text-sm text-gray-600">{order.address.phone}</p>
//                         <p className="text-sm text-gray-600">{order.address.email}</p>
//                       </div>
//                     </div>
                    
//                     <div>
//                       <h5 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
//                         Shipping Address
//                       </h5>
//                       <div className="bg-gray-50 rounded-lg p-4 space-y-1">
//                         <p className="text-sm text-gray-700">
//                           {order.address.street + ", "}
//                         </p>
//                         <p className="text-sm text-gray-700">
//                           {order.address.city +
//                             ", " +
//                             order.address.state +
//                             ", " +
//                             order.address.zipcode +
//                             ", " +
//                             order.address.country}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Order Summary and Status */}
//                   <div className="bg-gray-50 rounded-lg p-4 mb-6">
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                       <div>
//                         <span className="text-gray-500 block">Items</span>
//                         <span className="font-medium text-gray-900">{order.items.length}</span>
//                       </div>
//                       <div>
//                         <span className="text-gray-500 block">Method</span>
//                         <span className="font-medium text-gray-900">{order.paymentMethod}</span>
//                       </div>
//                       <div>
//                         <span className="text-gray-500 block">Payment</span>
//                         <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
//                           order.payment 
//                             ? 'bg-green-100 text-green-800' 
//                             : 'bg-red-100 text-red-800'
//                         }`}>
//                           {order.payment ? 'Done' : 'Pending'}
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-gray-500 block">Date</span>
//                         <span className="font-medium text-gray-900">
//                           {new Date(order.date).toLocaleDateString()}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Order Status Selector */}
//                   <div className="flex items-center justify-between pt-4 border-t border-gray-200">
//                     <span className="text-sm font-medium text-gray-700">Order Status:</span>
//                     <select onChange={(event)=>statusHandler(event, order._id)} value={order.status} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 min-w-[180px]">
//                       <option value="Order Placed">Order Placed</option>
//                       <option value="Packing">Packing</option>
//                       <option value="Shipped">Shipped</option>
//                       <option value="Out for delivery">Out for delivery</option>
//                       <option value="Delivered">Delivered</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Orders;


import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

// Company/Seller Information
const SELLER_INFO = {
  companyName: "Anvi",
  address: "Delhi, India",
  city: "Delhi",
  state: "Delhi",
  zipcode: "110001",
  country: "India",
  phone: "+91 98765 43210",
  email: "orders@anvi.com",
  website: "www.anvi.com",
  taxId: "GST-123456789",
  panNo: "ABCDE1234F"
};

const Invoice = ({ order, orderNumber, onClose }) => {
  const invoiceRef = useRef();
  const invoiceNumber = `INV-${Date.now()}-${orderNumber}`;
  const invoiceDate = new Date().toLocaleDateString();

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const invoiceHTML = invoiceRef.current.innerHTML;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice ${invoiceNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; line-height: 1.6; }
            .invoice-container { max-width: 800px; margin: 0 auto; }
            .header { border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
            .company-info { text-align: left; }
            .invoice-title { font-size: 28px; font-weight: bold; color: #333; margin-bottom: 10px; }
            .invoice-details { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .billing-section { display: flex; justify-content: space-between; margin: 30px 0; }
            .billing-info { width: 45%; }
            .items-table { width: 100%; border-collapse: collapse; margin: 30px 0; }
            .items-table th, .items-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            .items-table th { background: #f8f9fa; font-weight: bold; }
            .total-section { text-align: right; margin-top: 30px; }
            .total-row { margin: 10px 0; }
            .final-total { font-size: 18px; font-weight: bold; border-top: 2px solid #333; padding-top: 10px; }
            .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; }
            .gst-info { background: #e3f2fd; padding: 10px; border-radius: 5px; margin: 10px 0; }
            @media print {
              body { margin: 0; }
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          ${invoiceHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleDownload = () => {
    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice ${invoiceNumber}</title>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; line-height: 1.6; }
            .invoice-container { max-width: 800px; margin: 0 auto; }
            .header { border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
            .company-info { text-align: left; }
            .invoice-title { font-size: 28px; font-weight: bold; color: #333; margin-bottom: 10px; }
            .invoice-details { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .billing-section { display: flex; justify-content: space-between; margin: 30px 0; }
            .billing-info { width: 45%; }
            .items-table { width: 100%; border-collapse: collapse; margin: 30px 0; }
            .items-table th, .items-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            .items-table th { background: #f8f9fa; font-weight: bold; }
            .total-section { text-align: right; margin-top: 30px; }
            .total-row { margin: 10px 0; }
            .final-total { font-size: 18px; font-weight: bold; border-top: 2px solid #333; padding-top: 10px; }
            .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; }
            .gst-info { background: #e3f2fd; padding: 10px; border-radius: 5px; margin: 10px 0; }
          </style>
        </head>
        <body>
          ${invoiceRef.current.innerHTML}
        </body>
      </html>
    `;
    
    const blob = new Blob([invoiceHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice-${invoiceNumber}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Calculate totals (assuming 18% GST for India)
  const subtotal = parseFloat(order.amount);
  const gstRate = 0.18; // 18% GST
  const gstAmount = (subtotal * gstRate / (1 + gstRate)).toFixed(2);
  const baseAmount = (subtotal - parseFloat(gstAmount)).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6 no-print">
            <h2 className="text-2xl font-bold text-gray-900">Invoice Preview</h2>
            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download
              </button>
              <button
                onClick={handlePrint}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>

          {/* Invoice Content */}
          <div ref={invoiceRef} className="invoice-container bg-white p-8 border border-gray-200 rounded-lg">
            {/* Header */}
            <div className="header flex justify-between items-start mb-8">
              <div className="company-info">
                <h1 className="invoice-title text-3xl font-bold text-gray-900 mb-2">
                  {SELLER_INFO.companyName}
                </h1>
                <div className="text-gray-600 space-y-1">
                  <p>{SELLER_INFO.address}</p>
                  <p>{SELLER_INFO.city}, {SELLER_INFO.state} {SELLER_INFO.zipcode}</p>
                  <p>{SELLER_INFO.country}</p>
                  <p>Phone: {SELLER_INFO.phone}</p>
                  <p>Email: {SELLER_INFO.email}</p>
                  <p>Website: {SELLER_INFO.website}</p>
                </div>
                <div className="gst-info mt-3">
                  <p><strong>GSTIN:</strong> {SELLER_INFO.taxId}</p>
                  <p><strong>PAN:</strong> {SELLER_INFO.panNo}</p>
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">TAX INVOICE</h2>
                <div className="text-gray-600 space-y-2">
                  <p><strong>Invoice #:</strong> {invoiceNumber}</p>
                  <p><strong>Invoice Date:</strong> {invoiceDate}</p>
                  <p><strong>Order Date:</strong> {new Date(order.date).toLocaleDateString('en-IN')}</p>
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="invoice-details bg-gray-50 p-4 rounded-lg mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 block">Payment Method</span>
                  <span className="font-medium text-gray-900">{order.paymentMethod}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Payment Status</span>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    order.payment ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {order.payment ? 'Paid' : 'Pending'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Order Status</span>
                  <span className="font-medium text-gray-900">{order.status}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Place of Supply</span>
                  <span className="font-medium text-gray-900">Delhi, India</span>
                </div>
              </div>
            </div>

            {/* Billing Information */}
            <div className="billing-section grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="billing-info">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Bill To:</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium text-gray-900 mb-2">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <div className="text-gray-600 space-y-1">
                    <p>{order.address.street}</p>
                    <p>{order.address.city}, {order.address.state} {order.address.zipcode}</p>
                    <p>{order.address.country}</p>
                    <p>Phone: {order.address.phone}</p>
                    <p>Email: {order.address.email}</p>
                  </div>
                </div>
              </div>
              <div className="billing-info">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ship To:</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium text-gray-900 mb-2">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <div className="text-gray-600 space-y-1">
                    <p>{order.address.street}</p>
                    <p>{order.address.city}, {order.address.state} {order.address.zipcode}</p>
                    <p>{order.address.country}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
              <table className="items-table w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 p-3 text-left">S.No.</th>
                    <th className="border border-gray-300 p-3 text-left">Item Description</th>
                    <th className="border border-gray-300 p-3 text-center">Size</th>
                    <th className="border border-gray-300 p-3 text-center">Qty</th>
                    <th className="border border-gray-300 p-3 text-right">Rate</th>
                    <th className="border border-gray-300 p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => {
                    const itemTotal = (parseFloat(baseAmount) / order.items.length);
                    const itemRate = itemTotal / item.quantity;
                    return (
                      <tr key={index}>
                        <td className="border border-gray-300 p-3 text-center">{index + 1}</td>
                        <td className="border border-gray-300 p-3">{item.name}</td>
                        <td className="border border-gray-300 p-3 text-center">{item.size}</td>
                        <td className="border border-gray-300 p-3 text-center">{item.quantity}</td>
                        <td className="border border-gray-300 p-3 text-right">
                          {currency} {itemRate.toFixed(2)}
                        </td>
                        <td className="border border-gray-300 p-3 text-right">
                          {currency} {itemTotal.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Total Section */}
            <div className="total-section">
              <div className="w-80 ml-auto space-y-2">
                <div className="total-row flex justify-between py-2">
                  <span className="text-gray-600">Subtotal (Excl. GST):</span>
                  <span className="font-medium">{currency} {baseAmount}</span>
                </div>
                <div className="total-row flex justify-between py-2">
                  <span className="text-gray-600">CGST (9%):</span>
                  <span className="font-medium">{currency} {(parseFloat(gstAmount) / 2).toFixed(2)}</span>
                </div>
                <div className="total-row flex justify-between py-2">
                  <span className="text-gray-600">SGST (9%):</span>
                  <span className="font-medium">{currency} {(parseFloat(gstAmount) / 2).toFixed(2)}</span>
                </div>
                <div className="total-row flex justify-between py-2">
                  <span className="text-gray-600">Total GST (18%):</span>
                  <span className="font-medium">{currency} {gstAmount}</span>
                </div>
                <div className="total-row flex justify-between py-2">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="final-total flex justify-between py-3 border-t-2 border-gray-900 text-lg font-bold">
                  <span>Total Amount (Incl. GST):</span>
                  <span>{currency} {order.amount}</span>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  <p><strong>Amount in Words:</strong> {convertToWords(parseFloat(order.amount))} Rupees Only</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="footer mt-12 pt-6 border-t border-gray-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Terms & Conditions:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Goods once sold will not be taken back</li>
                    <li>• All disputes subject to Delhi jurisdiction</li>
                    <li>• Payment due within 30 days</li>
                  </ul>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 mb-2">For {SELLER_INFO.companyName}</p>
                  <div className="mt-8">
                    <p className="text-sm text-gray-600">Authorized Signatory</p>
                  </div>
                </div>
              </div>
              <div className="text-center text-gray-600 border-t pt-4">
                <p className="mb-2">Thank you for your business!</p>
                <p className="text-sm">
                  For queries, contact: {SELLER_INFO.email} | {SELLER_INFO.phone}
                </p>
                <p className="text-sm mt-2">
                  This is a computer-generated invoice and does not require physical signature.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to convert numbers to words (Indian format)
const convertToWords = (num) => {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  if (num === 0) return 'Zero';
  if (num < 0) return 'Minus ' + convertToWords(-num);
  
  let words = '';
  
  if (num >= 10000000) {
    words += convertToWords(Math.floor(num / 10000000)) + ' Crore ';
    num %= 10000000;
  }
  
  if (num >= 100000) {
    words += convertToWords(Math.floor(num / 100000)) + ' Lakh ';
    num %= 100000;
  }
  
  if (num >= 1000) {
    words += convertToWords(Math.floor(num / 1000)) + ' Thousand ';
    num %= 1000;
  }
  
  if (num >= 100) {
    words += ones[Math.floor(num / 100)] + ' Hundred ';
    num %= 100;
  }
  
  if (num >= 20) {
    words += tens[Math.floor(num / 10)] + ' ';
    num %= 10;
  } else if (num >= 10) {
    words += teens[num - 10] + ' ';
    num = 0;
  }
  
  if (num > 0) {
    words += ones[num] + ' ';
  }
  
  return words.trim();
};

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  
  const fetchAllOrders = async () => {
    if (!token) {
      console.log("No token available");
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
      if (!token) {
        toast.error('Authentication token missing');
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { 
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        await fetchAllOrders();
        toast.success('Status updated successfully');
      }
    } catch (error) {
      console.error('Status update failed:', error);
      
      if (error.response) {
        if (error.response.status === 401) {
          toast.error('Session expired - please login again');
        } else {
          toast.error(error.response.data.message || 'Update failed');
        }
      } else if (error.request) {
        toast.error('Network error - please try again');
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const generateInvoice = (order, orderNumber) => {
    setSelectedInvoice({ order, orderNumber });
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
                      <img src={assets.parcel_icon} alt="Package" className="w-10 h-10 rounded-full filter bg-transparent" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        Order #{index + 1}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString('en-IN', {
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
                      <button
                        onClick={() => generateInvoice(order, index + 1)}
                        className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Generate Invoice
                      </button>
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

      {/* Invoice Modal */}
      {selectedInvoice && (
        <Invoice 
          order={selectedInvoice.order} 
          orderNumber={selectedInvoice.orderNumber} 
          onClose={() => setSelectedInvoice(null)} 
        />
      )}
    </div>
  );
};

export default Orders;