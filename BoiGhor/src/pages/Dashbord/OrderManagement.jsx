import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
    Package,
    Search,
    Phone,
    MapPin
} from "lucide-react";
import useAxiosSecure from "../../hook/axiosSecure";

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const axiosSecure = useAxiosSecure();

    // Fetch orders
    const fetchOrders = async () => {
        try {
            const res = await axiosSecure.get("/orders");
            setOrders(res.data || []);
        } catch (err) {
            console.error("Fetch orders error:", err);
            Swal.fire("Error", "Failed to fetch orders.", "error");
        } finally {
            setLoading(false);
        }
    };

    // Update status
    const handleStatusChange = async (id, newStatus) => {
        try {
            await axiosSecure.patch(`/orders/${id}/status`, {
                status: newStatus,
            });

            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: `Order updated to ${newStatus}`,
                showConfirmButton: false,
                timer: 3000,
            });

            fetchOrders();
        } catch (err) {
            console.error("Status update error:", err);
            Swal.fire("Error", "Failed to update status.", "error");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Search filter
    const filteredOrders = orders.filter(order =>
        order?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order?._id?.includes(searchTerm)
    );

    // Status color helper
    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "processing":
                return "bg-blue-100 text-blue-800";
            case "shipped":
                return "bg-indigo-100 text-indigo-800";
            case "delivered":
                return "bg-green-100 text-green-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Package className="text-primary" />
                        Order Management
                    </h2>
                    <p className="text-sm text-gray-500">
                        Total Orders: <span className="font-bold">{filteredOrders.length}</span>
                    </p>
                </div>

                {/* Search */}
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, email or ID..."
                        className="input input-bordered w-full pl-10 h-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table table-md w-full">
                        <thead className="bg-base-200/50">
                            <tr>
                                <th>ID</th>
                                <th>Customer</th>
                                <th>Shipping</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {filteredOrders.map(order => (
                                    <motion.tr
                                        key={order._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <td className="font-mono text-xs">
                                            #{order._id?.slice(-6)}
                                        </td>

                                        <td>
                                            <div className="font-bold text-sm">
                                                {order.name || "N/A"}
                                            </div>
                                            <div className="text-xs opacity-60">
                                                {order.email}
                                            </div>
                                        </td>

                                        <td className="text-xs space-y-1">
                                            <div className="flex items-center gap-1">
                                                <Phone size={12} /> {order.phone || "N/A"}
                                            </div>
                                            <div className="flex items-center gap-1 truncate max-w-[160px]">
                                                <MapPin size={12} /> {order.address || "N/A"}
                                            </div>
                                        </td>

                                        <td>
                                            <span className="badge badge-ghost text-xs">
                                                {order.items?.length || 0} items
                                            </span>
                                        </td>

                                        <td className="font-bold text-primary">
                                            ${order.totalAmount || 0}
                                        </td>

                                        <td>
                                            <select
                                                className={`select select-sm select-bordered font-semibold ${getStatusColor(order.status)}`}
                                                value={order.status}
                                                onChange={(e) =>
                                                    handleStatusChange(order._id, e.target.value)
                                                }
                                                disabled={order.status === "cancelled"}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>

                    {filteredOrders.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            No orders found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderManagement;
