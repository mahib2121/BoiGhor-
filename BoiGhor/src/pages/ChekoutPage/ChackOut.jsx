// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import Swal from "sweetalert2";
// import { User, Mail, Phone, MapPin, CreditCard, ShoppingBag, ArrowLeft, CheckCircle } from "lucide-react";
// import { removeAll } from "../../redux/features/cart/cartSlice";

// const Checkout = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     // Safety check: Ensure we have data (if user refreshes, location.state is lost)
//     const { user, cartItems, subtotal } = location.state || {};

//     const [phone, setPhone] = useState("");
//     const [address, setAddress] = useState("");
//     const [isLoading, setIsLoading] = useState(false);

//     // Redirect to cart if no state is present (e.g., direct access via URL)
//     useEffect(() => {
//         if (!location.state) {
//             navigate("/cart", { replace: true });
//         }
//     }, [location.state, navigate]);

//     if (!user || !cartItems) return null; // Prevent flash of content before redirect

//     const handlePlaceOrder = async (e) => {
//         e.preventDefault();

//         if (!phone.trim() || !address.trim()) {
//             Swal.fire({
//                 icon: "warning",
//                 title: "Missing Information",
//                 text: "Please provide both your phone number and delivery address.",
//                 confirmButtonColor: "#3085d6",
//             });
//             return;
//         }

//         setIsLoading(true);

//         const orderData = {
//             userId: user.uid,
//             name: user.name,
//             email: user.email,
//             phone,
//             address,
//             items: cartItems,
//             totalAmount: subtotal,
//             status: "pending",
//             paymentStatus: "unpaid",
//             createdAt: new Date()
//         };

//         try {
//             const res = await axios.post("https://boi-ghor-kappa.vercel.app/orders", orderData);

//             if (res.data.insertedId || res.data.acknowledged) {
//                 dispatch(removeAll());

//                 Swal.fire({
//                     icon: "success",
//                     title: "Order Placed!",
//                     text: "Your order has been received successfully.",
//                     showConfirmButton: false,
//                     timer: 2000
//                 });

//                 navigate("/dashboard/my-orders");
//             }
//         } catch (error) {
//             console.error("Order creation error:", error);
//             Swal.fire({
//                 icon: "error",
//                 title: "Oops...",
//                 text: "Something went wrong. Please try again.",
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-base-200/50 py-12">
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

//                 {/* --- Page Header --- */}
//                 <div className="flex items-center gap-4 mb-8">
//                     <button
//                         onClick={() => navigate("/cart")}
//                         className="btn btn-circle btn-ghost btn-sm"
//                     >
//                         <ArrowLeft size={20} />
//                     </button>
//                     <h1 className="text-3xl font-bold flex items-center gap-2">
//                         <CheckCircle className="text-primary" /> Checkout
//                     </h1>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

//                     {/* --- LEFT SIDE: Shipping Form --- */}
//                     <div className="card bg-base-100 shadow-xl border border-base-200 h-fit">
//                         <div className="card-body">
//                             <h2 className="card-title text-xl mb-6 border-b border-base-200 pb-4">
//                                 Shipping Details
//                             </h2>

//                             <form className="space-y-5">
//                                 {/* Name (Read Only) */}
//                                 <div className="form-control">
//                                     <label className="label">
//                                         <span className="label-text font-medium">Full Name</span>
//                                     </label>
//                                     <div className="relative">
//                                         <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/50" />
//                                         <input
//                                             type="text"
//                                             value={user.name || ""}
//                                             readOnly
//                                             className="input input-bordered w-full pl-10 bg-base-200/50 text-base-content/70 cursor-not-allowed"
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* Email (Read Only) */}
//                                 <div className="form-control">
//                                     <label className="label">
//                                         <span className="label-text font-medium">Email Address</span>
//                                     </label>
//                                     <div className="relative">
//                                         <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/50" />
//                                         <input
//                                             type="text"
//                                             value={user.email || ""}
//                                             readOnly
//                                             className="input input-bordered w-full pl-10 bg-base-200/50 text-base-content/70 cursor-not-allowed"
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* Phone Input */}
//                                 <div className="form-control">
//                                     <label className="label">
//                                         <span className="label-text font-medium">Phone Number <span className="text-error">*</span></span>
//                                     </label>
//                                     <div className="relative">
//                                         <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/50" />
//                                         <input
//                                             type="tel"
//                                             placeholder="+880 1XXX XXXXXX"
//                                             value={phone}
//                                             onChange={(e) => setPhone(e.target.value)}
//                                             className="input input-bordered w-full pl-10 focus:input-primary transition-all"
//                                             required
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* Address Input */}
//                                 <div className="form-control">
//                                     <label className="label">
//                                         <span className="label-text font-medium">Delivery Address <span className="text-error">*</span></span>
//                                     </label>
//                                     <div className="relative">
//                                         <MapPin className="absolute left-3 top-4 w-5 h-5 text-base-content/50" />
//                                         <textarea
//                                             placeholder="Street, City, District..."
//                                             value={address}
//                                             onChange={(e) => setAddress(e.target.value)}
//                                             className="textarea textarea-bordered w-full pl-10 h-24 focus:textarea-primary transition-all leading-relaxed pt-3"
//                                             required
//                                         ></textarea>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>

//                     {/* --- RIGHT SIDE: Order Summary --- */}
//                     <div className="space-y-6">
//                         <div className="card bg-base-100 shadow-xl border border-base-200">
//                             <div className="card-body">
//                                 <h2 className="card-title text-xl mb-6 flex items-center gap-2">
//                                     <ShoppingBag size={20} /> Order Summary
//                                 </h2>

//                                 {/* Cart Items List */}
//                                 <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 mb-6 custom-scrollbar">
//                                     {cartItems.map((item) => (
//                                         <div key={item._id} className="flex gap-4 items-center bg-base-200/30 p-3 rounded-lg">
//                                             <div className="avatar">
//                                                 <div className="w-16 h-20 rounded bg-base-200">
//                                                     <img src={item.coverImage} alt={item.title} />
//                                                 </div>
//                                             </div>
//                                             <div className="flex-1 min-w-0">
//                                                 <h4 className="font-semibold text-sm truncate">{item.title}</h4>
//                                                 <p className="text-xs text-base-content/60 capitalize">{item.category}</p>
//                                                 <p className="text-xs mt-1">Qty: {item.qty || 1}</p>
//                                             </div>
//                                             <div className="font-bold text-primary">
//                                                 ${item.newPrice}
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 {/* Price Breakdown */}
//                                 <div className="space-y-3 border-t border-base-200 pt-4">
//                                     <div className="flex justify-between text-base-content/70">
//                                         <span>Subtotal</span>
//                                         <span>${subtotal.toFixed(2)}</span>
//                                     </div>
//                                     <div className="flex justify-between text-base-content/70">
//                                         <span>Shipping</span>
//                                         <span className="text-xs font-semibold text-success">Free Shipping</span>
//                                     </div>
//                                     <div className="flex justify-between font-bold text-lg pt-2 border-t border-base-200 mt-2">
//                                         <span>Total</span>
//                                         <span className="text-primary">${subtotal.toFixed(2)}</span>
//                                     </div>
//                                 </div>

//                                 {/* Action Buttons */}
//                                 <div className="card-actions mt-6">
//                                     <button
//                                         onClick={handlePlaceOrder}
//                                         disabled={isLoading}
//                                         className="btn btn-primary w-full btn-lg shadow-lg hover:shadow-primary/40"
//                                     >
//                                         {isLoading ? (
//                                             <span className="loading loading-spinner loading-md"></span>
//                                         ) : (
//                                             <>
//                                                 Confirm Order <CreditCard size={20} className="ml-2" />
//                                             </>
//                                         )}
//                                     </button>
//                                 </div>

//                                 <p className="text-xs text-center text-base-content/50 mt-4">
//                                     By placing this order, you agree to our Terms of Service and Privacy Policy.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Checkout;


import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { User, Mail, Phone, MapPin, CreditCard, ShoppingBag, ArrowLeft, CheckCircle, Wallet, Banknote } from "lucide-react";
import { removeAll } from "../../redux/features/cart/cartSlice";

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Safety check: Ensure we have data
    const { user, cartItems, subtotal } = location.state || {};

    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cod"); // 'cod' or 'online'
    const [isLoading, setIsLoading] = useState(false);

    // Redirect to cart if no state is present
    useEffect(() => {
        if (!location.state) {
            navigate("/cart", { replace: true });
        }
    }, [location.state, navigate]);

    if (!user || !cartItems) return null;

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (!phone.trim() || !address.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Missing Information",
                text: "Please provide both your phone number and delivery address.",
                confirmButtonColor: "#3085d6",
            });
            return;
        }

        setIsLoading(true);

        const orderData = {
            userId: user.uid,
            name: user.name,
            email: user.email,
            phone,
            address,
            items: cartItems,
            totalAmount: subtotal,
            paymentMethod: paymentMethod, // Added Payment Method
            status: "pending",
            paymentStatus: paymentMethod === 'online' ? 'pending_gateway' : 'unpaid',
            createdAt: new Date()
        };

        try {
            const res = await axios.post("https://boi-ghor-kappa.vercel.app/orders", orderData);

            if (res.data.insertedId || res.data.acknowledged) {
                dispatch(removeAll());

                Swal.fire({
                    icon: "success",
                    title: "Order Placed!",
                    text: `Order placed successfully via ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}.`,
                    showConfirmButton: false,
                    timer: 2000
                });

                navigate("/dashboard/my-orders");
            }
        } catch (error) {
            console.error("Order creation error:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200/50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

                {/* --- Page Header --- */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate("/cart")}
                        className="btn btn-circle btn-ghost btn-sm"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <CheckCircle className="text-primary" /> Checkout
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* --- LEFT SIDE: Form Sections --- */}
                    <div className="space-y-6">

                        {/* 1. Shipping Details */}
                        <div className="card bg-base-100 shadow-xl border border-base-200">
                            <div className="card-body">
                                <h2 className="card-title text-xl mb-6 border-b border-base-200 pb-4">
                                    Shipping Details
                                </h2>

                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="form-control">
                                            <label className="label"><span className="label-text font-medium">Name</span></label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50" />
                                                <input type="text" value={user.name} readOnly className="input input-bordered w-full pl-9 bg-base-200/50 cursor-not-allowed text-sm" />
                                            </div>
                                        </div>
                                        <div className="form-control">
                                            <label className="label"><span className="label-text font-medium">Email</span></label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50" />
                                                <input type="text" value={user.email} readOnly className="input input-bordered w-full pl-9 bg-base-200/50 cursor-not-allowed text-sm" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-control">
                                        <label className="label"><span className="label-text font-medium">Phone <span className="text-error">*</span></span></label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50" />
                                            <input
                                                type="tel"
                                                placeholder="+880 1XXX..."
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="input input-bordered w-full pl-9 focus:input-primary"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-control">
                                        <label className="label"><span className="label-text font-medium">Address <span className="text-error">*</span></span></label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-4 w-4 h-4 text-base-content/50" />
                                            <textarea
                                                placeholder="Street address..."
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                className="textarea textarea-bordered w-full pl-9 h-24 focus:textarea-primary pt-3"
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* 2. Payment Method */}
                        <div className="card bg-base-100 shadow-xl border border-base-200">
                            <div className="card-body">
                                <h2 className="card-title text-xl mb-4 border-b border-base-200 pb-4">
                                    Payment Method
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div
                                        onClick={() => setPaymentMethod('cod')}
                                        className={`cursor-pointer border-2 rounded-xl p-4 flex items-center gap-4 transition-all hover:bg-base-200 ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-base-200'}`}
                                    >
                                        <div className={`p-3 rounded-full ${paymentMethod === 'cod' ? 'bg-primary text-white' : 'bg-base-200 text-base-content'}`}>
                                            <Banknote size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold">Cash on Delivery</p>
                                            <p className="text-xs text-base-content/60">Pay when you receive</p>
                                        </div>
                                    </div>

                                    <div
                                        onClick={() => setPaymentMethod('online')}
                                        className={`cursor-pointer border-2 rounded-xl p-4 flex items-center gap-4 transition-all hover:bg-base-200 ${paymentMethod === 'online' ? 'border-primary bg-primary/5' : 'border-base-200'}`}
                                    >
                                        <div className={`p-3 rounded-full ${paymentMethod === 'online' ? 'bg-primary text-white' : 'bg-base-200 text-base-content'}`}>
                                            <CreditCard size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold">Online Payment</p>
                                            <p className="text-xs text-base-content/60">Cards, Mobile Banking</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT SIDE: Order Summary --- */}
                    <div className="space-y-6">
                        <div className="card bg-base-100 shadow-xl border border-base-200 sticky top-24">
                            <div className="card-body">
                                <h2 className="card-title text-xl mb-6 flex items-center gap-2">
                                    <ShoppingBag size={20} /> Order Summary
                                </h2>

                                {/* Cart Items List */}
                                <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 mb-6 custom-scrollbar">
                                    {cartItems.map((item) => (
                                        <div key={item._id} className="flex gap-4 items-center bg-base-200/30 p-3 rounded-lg">
                                            <div className="avatar">
                                                <div className="w-16 h-20 rounded bg-base-200">
                                                    <img src={item.coverImage} alt={item.title} />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-sm truncate">{item.title}</h4>
                                                <p className="text-xs text-base-content/60 capitalize">{item.category}</p>
                                                <p className="text-xs mt-1">Qty: {item.qty || 1}</p>
                                            </div>
                                            <div className="font-bold text-primary">
                                                ${item.newPrice}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Price Breakdown */}
                                <div className="space-y-3 border-t border-base-200 pt-4">
                                    <div className="flex justify-between text-base-content/70">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-base-content/70">
                                        <span>Shipping</span>
                                        <span className="text-xs font-semibold text-success">Free Shipping</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-base-200 mt-2">
                                        <span>Total</span>
                                        <span className="text-primary">${subtotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="card-actions mt-6">
                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={isLoading}
                                        className="btn btn-primary w-full btn-lg shadow-lg hover:shadow-primary/40"
                                    >
                                        {isLoading ? (
                                            <span className="loading loading-spinner loading-md"></span>
                                        ) : (
                                            <>
                                                Confirm Order <Wallet size={20} className="ml-2" />
                                            </>
                                        )}
                                    </button>
                                </div>

                                <p className="text-xs text-center text-base-content/50 mt-4">
                                    Secure checkout powered by Stripe & SSL.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;