import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeAll, removeFromCart } from '../../redux/features/cart/cartSlice';
import emptyCart from '../../assets/empty-cart.png';
import useAuth from '../../Firebase/useAuth';

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

    // If cart is empty
    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh]">
                <img src={emptyCart} alt="Empty cart" className="w-64 opacity-80" />

                <h2 className="text-2xl font-semibold mt-4">Your cart is empty</h2>
                <p className="text-gray-500">Add books to your cart to continue shopping.</p>

                <Link to="/all-books" className="mt-6 btn btn-primary">
                    Browse Books
                </Link>
            </div>
        );
    }

    // Calculate subtotal
    const subtotal = cartItems.reduce((sum, item) => {
        const price = Number(item.newPrice);
        const qty = item.qty ?? 1;
        return sum + (isNaN(price) ? 0 : price * qty);
    }, 0);

    return (
        <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">

            {/* Header */}
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                    <h1 className="text-lg font-medium text-gray-900">Shopping Cart</h1>

                    <button
                        onClick={handleClearCart}
                        className="py-1 px-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                    >
                        Clear Cart
                    </button>
                </div>

                {/* Cart Items */}
                <div className="mt-8">
                    <div className="flow-root">
                        <ul className="-my-6 divide-y divide-gray-200">

                            {cartItems.map((item) => (
                                <li key={item._id} className="flex py-6">

                                    {/* Book Image */}
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                                        <img
                                            src={item.coverImage}
                                            alt={item.title}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">

                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <Link to="/">{item.title}</Link>
                                                </h3>
                                                <p className="sm:ml-4">${item.newPrice}</p>
                                            </div>

                                            <p className="mt-1 text-sm text-gray-500">
                                                <strong>Category:</strong> {item.category || "N/A"}
                                            </p>
                                        </div>

                                        <div className="flex items-end justify-between text-sm">
                                            <p className="text-gray-500">
                                                <strong>Qty:</strong> {item.qty ?? 1}
                                            </p>

                                            <button
                                                onClick={() => handleRemoveFromCart(item._id)}
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                </li>
                            ))}

                        </ul>
                    </div>
                </div>
            </div>

            {/* Subtotal Section */}
            <div className="border-t px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                </div>

                <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                </p>

                {/* Checkout Button */}
                <div className="mt-6">
                    <Link
                        to="/checkout"
                        state={{
                            user: {
                                uid: user.uid,
                                name: user.displayName,
                                email: user.email
                            },
                            cartItems,
                            subtotal
                        }}
                        className="flex justify-center rounded-md bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700"
                    >
                        Checkout
                    </Link>
                </div>

                {/* Continue Shopping */}
                <div className="mt-6 flex justify-center text-sm text-gray-500">
                    <Link to="/">
                        or
                        <button className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
                            Continue Shopping →
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default CartPage;
