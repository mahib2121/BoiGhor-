import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; // Assumes you are using react-router-dom

// 1. Import the hook
import useAxiosSecure from "../../hook/axiosSecure";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");

    // 2. Initialize the hook to get the axios instance
    const axiosSecure = useAxiosSecure();

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!sessionId) return;

        const confirmPayment = async () => {
            try {
                // 3. Use 'axiosSecure.patch', NOT 'useAxiosSecure.patch'
                const res = await axiosSecure.patch(
                    `/payment-success?session_id=${sessionId}`
                );
                setResult(res.data);
            } catch (err) {
                setError("Payment confirmation failed");
            } finally {
                setLoading(false);
            }
        };

        confirmPayment();
    }, [sessionId, axiosSecure]); // Added axiosSecure to dependencies

    if (loading) {
        return <p className="text-center mt-10">Confirming payment...</p>;
    }

    if (error) {
        return (
            <p className="text-center mt-10 text-red-500">
                {error}
            </p>
        );
    }

    return (
        <div className="p-6 text-center">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
                Payment Successful 🎉
            </h2>

            <div className="space-y-2">
                <p>
                    <strong>Transaction ID:</strong>{" "}
                    {result?.paymentId}
                </p>
                <p>
                    <strong>Order ID:</strong>{" "}
                    {result?.orderId}
                </p>
            </div>
        </div>
    );
};

export default PaymentSuccess;