import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../../Firebase/useAuth";
import axiosSecure from "../../hook/axiosSecure";

const MyOrder = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
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

    // PAY NOW
    const handlePayNow = (id) => {
        navigate(`payment/${id}`);
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

                            <td>
                                {order.items.map((i) => (
                                    <p key={i._id}>{i.title}</p>
                                ))}
                            </td>

                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                            <td>${order.totalAmount}</td>

                            <td className="capitalize">{order.status}</td>

                            <td className="capitalize">{order.paymentStatus}</td>

                            <td className="space-x-2">
                                {order.paymentStatus === "unpaid" && order.status === "pending" && (
                                    // <button
                                    //     className="btn btn-xs btn-success"
                                    //     onClick={() => handlePayNow(order._id)}
                                    // >
                                    //     Pay Now
                                    // </button>
                                    <Link to={`/dashboard/payment/${order._id}`}
                                        className="btn btn-xs btn-success"

                                    >
                                        Pay Now
                                    </Link>
                                )}

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
