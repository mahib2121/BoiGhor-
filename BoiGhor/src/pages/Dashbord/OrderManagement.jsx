import { useEffect, useState } from "react";
import useAxiosSecure from "../../hook/axiosSecure";

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();
    const fetchOrders = async () => {
        try {
            const res = await axiosSecure.get("/orders");
            setOrders(res.data);
        } catch (err) {
            console.log("Fetch orders error:", err);
        } finally {
            setLoading(false);
        }
    };
    const handleStatusChange = async (id, newStatus) => {
        try {
            await axiosSecure.patch(`/orders/${id}/status`, {
                status: newStatus,
            });
            fetchOrders();
        } catch (err) {
            console.log("Status update error:", err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="overflow-x-auto bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-4">Order Management</h2>

            <table className="table w-full">
                <thead>
                    <tr className="bg-base-200">
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Items</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order._id}>
                            <td>{index + 1}</td>
                            <td>{order.name}</td>
                            <td>{order.email}</td>
                            <td>{order.phone}</td>
                            <td>{order.address}</td>
                            <td>
                                {order.items.map((item) => (
                                    <p key={item._id}>{item.title}</p>
                                ))}
                            </td>
                            <td>
                                <select
                                    className="select select-sm select-bordered"
                                    value={order.status}
                                    onChange={(e) =>
                                        handleStatusChange(order._id, e.target.value)
                                    }
                                    disabled={order.status === "delivered"}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderManagement;
