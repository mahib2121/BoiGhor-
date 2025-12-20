import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { Package, Calendar, DollarSign, CreditCard, XCircle, AlertCircle, ShoppingBag } from "lucide-react";
import useAuth from "../../Firebase/useAuth";
import useAxiosSecure from "../../hook/axiosSecure";

const MyOrder = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    const fetchOrders = async () => {
        try {
            const res = await axiosSecure.get(`/orders?email=${user.email}`);
            setOrders(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setLoading(false);
        }
    };

    const handleCancel = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this cancellation!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.patch(`/orders/${id}/cancel`);
                    Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
                    fetchOrders(); // Refresh data
                } catch (err) {
                    console.error("Cancel error:", err);
                    Swal.fire("Error!", "Failed to cancel order.", "error");
                }
            }
        });
    };

    useEffect(() => {
        if (user?.email) {
            fetchOrders();
        }
    }, [user, axiosSecure]);

    // --- Helper for Badge Colors ---
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'badge-warning';
            case 'processing': return 'badge-info';
            case 'shipped': return 'badge-primary';
            case 'delivered': return 'badge-success';
            case 'cancelled': return 'badge-error';
            default: return 'badge-ghost';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="bg-base-200 p-6 rounded-full mb-4">
                    <Package size={48} className="text-base-content/30" />
                </div>
                <h3 className="text-xl font-bold text-base-content">No orders yet</h3>
                <p className="text-base-content/60 mb-6">You haven't placed any orders yet.</p>
                <Link to="/all-books" className="btn btn-primary">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <ShoppingBag size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-base-content">My Orders</h2>
                    <p className="text-sm text-base-content/60">Manage your recent purchases</p>
                </div>
            </div>

            {/* Table Card */}
            <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table table-lg w-full">
                        {/* Head */}
                        <thead className="bg-base-200/50 text-base-content">
                            <tr>
                                <th>Order ID</th>
                                <th>Items</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Payment</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {orders.map((order) => (
                                    <motion.tr
                                        key={order._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="hover:bg-base-200/30 transition-colors"
                                    >
                                        <td className="font-mono text-xs opacity-70">
                                            #{order._id.slice(-6)}
                                        </td>

                                        <td>
                                            <div className="flex flex-col gap-1">
                                                <span className="font-medium text-sm">
                                                    {order.items[0]?.title}
                                                </span>
                                                {order.items.length > 1 && (
                                                    <span className="text-xs badge badge-ghost badge-sm w-fit">
                                                        +{order.items.length - 1} more items
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        <td>
                                            <div className="flex items-center gap-2 text-sm text-base-content/70">
                                                <Calendar size={14} />
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>

                                        <td className="font-bold text-primary">
                                            ${order.totalAmount}
                                        </td>

                                        <td>
                                            <div className={`badge ${getStatusColor(order.status)} gap-2 capitalize font-medium`}>
                                                {order.status}
                                            </div>
                                        </td>

                                        <td>
                                            <div className={`flex items-center gap-1 text-sm font-medium ${order.paymentStatus === 'paid' ? 'text-success' : 'text-warning'
                                                }`}>
                                                <CreditCard size={14} />
                                                <span className="capitalize">{order.paymentStatus}</span>
                                            </div>
                                        </td>

                                        <td className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Pay Button */}
                                                {order.paymentStatus === "unpaid" && order.status !== "cancelled" && (
                                                    <Link
                                                        to={`/dashboard/payment/${order._id}`}
                                                        className="btn btn-sm btn-primary shadow-sm"
                                                    >
                                                        Pay Now
                                                    </Link>
                                                )}

                                                {/* Cancel Button */}
                                                {order.status === "pending" && (
                                                    <button
                                                        onClick={() => handleCancel(order._id)}
                                                        className="btn btn-sm btn-ghost text-error hover:bg-error/10 tooltip tooltip-left"
                                                        data-tip="Cancel Order"
                                                    >
                                                        <XCircle size={18} />
                                                    </button>
                                                )}

                                                {/* If Cancelled/Paid, show a disabled info icon or nothing */}
                                                {order.status === "cancelled" && (
                                                    <span className="text-xs text-error flex items-center gap-1">
                                                        <AlertCircle size={14} /> Cancelled
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyOrder;