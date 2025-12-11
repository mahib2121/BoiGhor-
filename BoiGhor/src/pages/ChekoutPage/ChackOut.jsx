import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeAll } from "../../redux/features/cart/cartSlice";

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, cartItems, subtotal } = location.state || {};

    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handlePlaceOrder = async () => {
        if (!phone || !address) {
            alert("Please fill out all fields");
            return;
        }

        const orderData = {
            userId: user.uid,
            name: user.name,
            email: user.email,
            phone,
            address,
            items: cartItems,
            totalAmount: subtotal,
            status: "pending",
            paymentStatus: "unpaid",
            createdAt: new Date()
        };

        try {
            const res = await axios.post("http://localhost:3000/orders", orderData);

            if (res.data.insertedId || res.data.acknowledged) {
                dispatch(removeAll());
                navigate("/dashboard/my-orders");
            }
        } catch (error) {
            console.log("Order creation error:", error);
        }
    };

    if (!user) {
        return (
            <div className="text-center text-xl font-semibold mt-20">
                Please login to continue
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* LEFT SIDE — FORM */}
            <div className="bg-white shadow-lg rounded-xl p-8">

                <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

                {/* Name */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        readOnly
                        value={user.name}
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        readOnly
                        value={user.email}
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Phone */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Phone Number</label>
                    <input
                        type="text"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Address */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Address</label>
                    <textarea
                        placeholder="Enter delivery address"
                        className="textarea textarea-bordered w-full"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                </div>

                {/* Place Order */}
                <button
                    onClick={handlePlaceOrder}
                    className="btn btn-primary w-full mt-4"
                >
                    Place Order
                </button>

                {/* Back */}
                <button
                    onClick={() => navigate("/cart")}
                    className="btn btn-outline w-full mt-3"
                >
                    Back to Cart
                </button>
            </div>

            {/* RIGHT SIDE — ORDER SUMMARY */}
            <div className="bg-white shadow-lg rounded-xl p-8">

                <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

                <ul className="space-y-4">

                    {cartItems.map((item) => (
                        <li key={item._id} className="flex items-center gap-4 border-b pb-4">

                            <img
                                src={item.coverImage}
                                alt={item.title}
                                className="w-20 h-24 object-cover rounded-md border"
                            />

                            <div className="flex-1">
                                <h3 className="font-medium">{item.title}</h3>
                                <p className="text-sm text-gray-500 capitalize">{item.category}</p>

                                <p className="mt-1 text-sm">
                                    <strong>Qty:</strong> {item.qty}
                                </p>
                            </div>

                            <p className="font-semibold text-gray-800">${item.newPrice}</p>
                        </li>
                    ))}

                </ul>

                {/* Subtotal */}
                <div className="mt-6 border-t pt-4 flex justify-between text-lg font-medium">
                    <p>Subtotal:</p>
                    <p>${subtotal.toFixed(2)}</p>
                </div>

                <p className="text-gray-500 text-sm mt-1">
                    Shipping & taxes calculated at delivery.
                </p>
            </div>

        </div>
    );
};

export default Checkout;
