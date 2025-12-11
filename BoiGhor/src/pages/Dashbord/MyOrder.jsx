import React, { useEffect, useState } from "react";

import useAuth from "../../Firebase/useAuth";
import axiosSecure from "../../hook/axiosSecure";

const MyOrder = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    // FETCH USER ORDERS
    const fetchOrders = async () => {
        try {
            const res = await axiosSecure.get(`/orders?email=${user.email}`);
            setOrders(res.data);
        } catch (err) {
            console.log("Error fetching orders:", err);
        }
    };

    // CANCEL ORDER
    const handleCancel = async (id) => {
        try {
            await axiosSecure.put(`/orders/${id}/cancel`);
            fetchOrders(); // refresh list
        } catch (err) {
            console.log("Cancel error:", err);
        }
    };

    // PAY NOW (just navigate or open payment gateway)
    const handlePayNow = (orderId) => {
        console.log("Redirect to payment for:", orderId);
        // navigate(`/payment/${orderId}`);
    };

    useEffect(() => {
        if (user?.email) {
            fetchOrders();
        }
    }, [user]);

    return (
        <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-md">

            <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

            <table className="table w-full">
                <thead>
                    <tr className="bg-base-200">
                        <th>#</th>
                        <th>Book Title</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order._id}>
                            <td>{index + 1}</td>

                            {/* Book Title */}
                            <td>
                                {order.items.map((i) => (
                                    <p key={i._id}>{i.title}</p>
                                ))}
                            </td>

                            {/* Order Date */}
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                            {/* Total Amount */}
                            <td>${order.totalAmount}</td>

                            {/* Status */}
                            <td className="capitalize">{order.status}</td>

                            {/* Payment Status */}
                            <td className="capitalize">{order.paymentStatus}</td>

                            <td className="space-x-2">

                                {/* SHOW PAY NOW ONLY IF unpaid + pending */}
                                {order.paymentStatus === "unpaid" && order.status === "pending" && (
                                    <button
                                        className="btn btn-xs btn-success"
                                        onClick={() => handlePayNow(order._id)}
                                    >
                                        Pay Now
                                    </button>
                                )}

                                {/* SHOW CANCEL ONLY IF pending */}
                                {order.status === "pending" && (
                                    <button
                                        className="btn btn-xs btn-error"
                                        onClick={() => handleCancel(order._id)}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default MyOrder;
