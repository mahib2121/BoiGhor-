import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Calendar, DollarSign, FileText, AlertCircle } from "lucide-react";
import useAxiosSecure from "../../hook/axiosSecure";
import useAuth from "../../Firebase/useAuth";

const MyPayments = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user?.email) return;

        const fetchPayments = async () => {
            try {
                setLoading(true);
                const res = await axiosSecure.get(`/payments?email=${user.email}`);
                setPayments(res.data);
            } catch (err) {
                console.error("Payment fetch error:", err);
                setError("Failed to load payment history. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [user, axiosSecure]);

    // Helper for Status Badge Colors
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'succeeded':
            case 'paid':
                return 'badge-success text-white';
            case 'pending':
                return 'badge-warning text-white';
            case 'failed':
                return 'badge-error text-white';
            default:
                return 'badge-ghost';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-error">
                <AlertCircle size={48} className="mb-4 opacity-50" />
                <h3 className="text-xl font-bold">Error Loading Data</h3>
                <p>{error}</p>
            </div>
        );
    }

    if (payments.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <div className="bg-base-200 p-6 rounded-full mb-4">
                    <CreditCard size={48} className="text-base-content/30" />
                </div>
                <h3 className="text-xl font-bold text-base-content">No Payments Yet</h3>
                <p className="text-base-content/60 mb-6">You haven't made any transactions yet.</p>
                <Link to="/all-books" className="btn btn-primary">Browse Books</Link>
            </div>
        );
    }

    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <FileText size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-base-content">Payment History</h2>
                    <p className="text-sm text-base-content/60">Track all your transactions</p>
                </div>
            </div>

            {/* Table Card */}
            <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table table-lg w-full">
                        <thead className="bg-base-200/50 text-base-content">
                            <tr>
                                <th>Transaction ID</th>
                                <th>Order Info</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {payments.map((pay) => (
                                    <motion.tr
                                        key={pay._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="hover:bg-base-200/30 transition-colors"
                                    >
                                        <td>
                                            <div className="font-mono text-xs opacity-70 bg-base-200 px-2 py-1 rounded w-fit">
                                                {pay.paymentId || "N/A"}
                                            </div>
                                        </td>

                                        <td>
                                            <span className="text-sm font-medium opacity-80">
                                                Order #{pay.orderId ? pay.orderId.slice(-6) : "N/A"}
                                            </span>
                                        </td>

                                        <td className="font-bold text-primary">
                                            <div className="flex items-center gap-1">
                                                <DollarSign size={14} />
                                                {pay.amount} <span className="text-xs font-normal uppercase opacity-60">{pay.currency}</span>
                                            </div>
                                        </td>

                                        <td>
                                            <div className={`badge ${getStatusColor(pay.status)} gap-2 capitalize font-medium`}>
                                                {pay.status}
                                            </div>
                                        </td>

                                        <td>
                                            <div className="flex items-center gap-2 text-sm text-base-content/70">
                                                <Calendar size={14} />
                                                {new Date(pay.createdAt || new Date()).toLocaleDateString()}
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

export default MyPayments;