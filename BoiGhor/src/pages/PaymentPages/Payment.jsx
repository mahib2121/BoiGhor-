import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axiosSecure from "../../hook/axiosSecure";

const Payment = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!orderId) return;

        const fetchOrder = async () => {
            try {
                setLoading(true);
                const res = await axiosSecure.get(`/orders/${orderId}`);
                setOrder(res.data);
                setError(false);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) {
        return <div className="text-center mt-20">Loading...</div>;
    }

    if (error || !order) {
        return (
            <div className="text-center mt-20 text-red-500">
                Failed to load order
            </div>
        );
    }

    const handlePayment = async () => {
        try {
            const PayInfo = {
                cost: order.totalAmount,
                orderId: order._id,
                name: order.name,
                email: order.email,
            };

            const res = await axiosSecure.post(
                '/payment-checkout-session',
                PayInfo
            );

            // Redirect to Stripe Checkout
            window.location.href = res.data.url;
        } catch (err) {
            console.error('Payment error', err);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-12 bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-4">Payment</h2>

            {/* Order Info */}
            <div className="mb-4 space-y-1">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Payment:</strong> {order.paymentStatus}</p>
            </div>

            {/* Items */}
            <div className="border rounded-lg p-4 mb-4">
                <h3 className="font-semibold mb-2">Order Items</h3>

                {order.items.map((item) => (
                    <div
                        key={item._id}
                        className="flex justify-between text-sm py-1"
                    >
                        <span>
                            {item.title} (x{item.qty})
                        </span>
                        <span>${item.newPrice}</span>
                    </div>
                ))}
            </div>

            {/* Total */}
            <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${order.totalAmount}</span>
            </div>

            {/* Actions */}
            {order.paymentStatus === "unpaid" && (
                <button
                    className="btn btn-primary w-full mt-6"
                    onClick={() => handlePayment()}
                >
                    Pay Now
                </button>
            )}

            <button
                className="btn btn-outline w-full mt-3"
                onClick={() => navigate("dashboard/my-orders")}
            >
                Back to Orders
            </button>
        </div>
    );
};

export default Payment;
