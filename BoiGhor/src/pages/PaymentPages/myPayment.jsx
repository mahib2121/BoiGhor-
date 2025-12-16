import { useEffect, useState } from "react";
// 1. Only import the hook once
import useAxiosSecure from "../../hook/axiosSecure";
import useAuth from "../../Firebase/useAuth";

const MyPayments = () => {
    const { user } = useAuth();
    // 2. Initialize the hook to get the axios instance
    const axiosSecure = useAxiosSecure();

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user?.email) return;

        const fetchPayments = async () => {
            try {
                setLoading(true);
                // 3. Use the instance 'axiosSecure', NOT the hook name
                const res = await axiosSecure.get(
                    `/payments?email=${user.email}`
                );
                setPayments(res.data);
            } catch (err) {
                setError("Failed to load payment history");
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [user, axiosSecure]); // Added axiosSecure to dependencies

    if (loading) {
        return (
            <div className="text-center mt-10">
                Loading payment history...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center mt-10 text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
                My Payments ({payments.length})
            </h2>

            {payments.length === 0 ? (
                <p className="text-gray-500 text-center mt-6">
                    You have not made any payments yet.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Payment ID</th>
                                <th>Order ID</th>
                                <th>Amount</th>
                                <th>Currency</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((pay, index) => (
                                <tr key={pay._id}>
                                    <td>{index + 1}</td>
                                    <td className="break-all">
                                        {pay.paymentId}
                                    </td>
                                    <td className="break-all">
                                        {pay.orderId}
                                    </td>
                                    <td>
                                        {pay.amount}
                                    </td>
                                    <td className="uppercase">
                                        {pay.currency}
                                    </td>
                                    <td>
                                        <span
                                            className={`badge ${pay.status === "paid" ||
                                                pay.status === "succeeded"
                                                ? "badge-success"
                                                : "badge-warning"
                                                }`}
                                        >
                                            {pay.status}
                                        </span>
                                    </td>
                                    <td>
                                        {new Date(
                                            pay.createdAt
                                        ).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyPayments;