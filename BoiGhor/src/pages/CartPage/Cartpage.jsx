import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, CreditCard } from 'lucide-react';
import { removeAll, removeFromCart } from '../../redux/features/cart/cartSlice';
import useAuth from '../../Firebase/useAuth';

// If you don't have this image, the ShoppingBag icon below acts as a fallback
import emptyCartImg from '../../assets/empty-cart.png';

const CartPage = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleClearCart = () => {
        dispatch(removeAll());
    };

    // Calculate subtotal
    const subtotal = cartItems.reduce((sum, item) => {
        const price = Number(item.newPrice);
        const qty = item.qty ?? 1;
        return sum + (isNaN(price) ? 0 : price * qty);
    }, 0);

    // --- Empty Cart State ---
    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Fallback to Icon if image fails, or use both */}
                    <div className="bg-base-200 p-8 rounded-full mb-6 inline-flex">
                        <ShoppingBag size={64} className="text-base-content/20" />
                    </div>
                </motion.div>

                <h2 className="text-3xl font-bold mb-2 text-base-content">Your cart is empty</h2>
                <p className="text-base-content/60 mb-8 max-w-md">
                    Looks like you haven't added any books to your cart yet.
                    Explore our collection to find your next great read.
                </p>

                <Link to="/all-books" className="btn btn-primary btn-lg shadow-lg">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200/50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Page Title */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <ShoppingBag className="text-primary" />
                        Shopping Cart
                        <span className="text-lg font-normal text-base-content/60">
                            ({cartItems.length} items)
                        </span>
                    </h1>

                    <button
                        onClick={handleClearCart}
                        className="btn btn-ghost text-error hover:bg-error/10 btn-sm"
                    >
                        <Trash2 size={16} />
                        Clear Cart
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* --- Left Column: Cart Items --- */}
                    <div className="lg:col-span-2 space-y-4">
                        <AnimatePresence>
                            {cartItems.map((item) => (
                                <motion.div
                                    key={item._id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    className="card card-side bg-base-100 shadow-sm border border-base-200 p-4 items-center"
                                >
                                    {/* Product Image */}
                                    <figure className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-base-200">
                                        <img
                                            src={item.coverImage}
                                            alt={item.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </figure>

                                    {/* Product Details */}
                                    <div className="card-body py-0 px-4 flex-1 block sm:flex sm:justify-between sm:items-center">
                                        <div className="space-y-1">
                                            <div className="badge badge-outline badge-sm opacity-70">
                                                {item.category || "Book"}
                                            </div>
                                            <h3 className="card-title text-lg">
                                                <Link to={`/books/${item._id}`} className="hover:text-primary transition-colors">
                                                    {item.title}
                                                </Link>
                                            </h3>
                                            <p className="text-sm text-base-content/60">
                                                Qty: {item.qty ?? 1}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between sm:flex-col sm:items-end mt-4 sm:mt-0 gap-4">
                                            <p className="text-xl font-bold text-primary">
                                                ${item.newPrice}
                                            </p>

                                            <button
                                                onClick={() => handleRemoveFromCart(item._id)}
                                                className="btn btn-ghost btn-circle btn-sm text-base-content/40 hover:text-error hover:bg-error/10"
                                                title="Remove Item"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* --- Right Column: Order Summary --- */}
                    <div className="lg:col-span-1">
                        <div className="card bg-base-100 shadow-xl border border-base-200 sticky top-24">
                            <div className="card-body">
                                <h2 className="card-title text-xl mb-4 border-b border-base-200 pb-4">Order Summary</h2>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-base-content/70">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-base-content/70">
                                        <span>Shipping</span>
                                        <span className="text-xs badge badge-ghost">Calculated at checkout</span>
                                    </div>
                                    <div className="flex justify-between text-base-content/70">
                                        <span>Tax</span>
                                        <span>$0.00</span>
                                    </div>
                                </div>

                                <div className="divider my-2"></div>

                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="text-2xl font-bold text-primary">${subtotal.toFixed(2)}</span>
                                </div>

                                <Link
                                    to="/checkout"
                                    state={{
                                        user: user ? {
                                            uid: user.uid,
                                            name: user.displayName,
                                            email: user.email
                                        } : null,
                                        cartItems,
                                        subtotal
                                    }}
                                    className="btn btn-primary btn-lg w-full shadow-lg hover:shadow-primary/40"
                                >
                                    Proceed to Checkout
                                    <CreditCard size={20} className="ml-2" />
                                </Link>

                                <div className="mt-4 text-center">
                                    <Link to="/all-books" className="link link-hover text-sm text-base-content/60 flex items-center justify-center gap-1">
                                        <ArrowLeft size={14} /> Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CartPage;