import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeAll, removeFromCart } from '../../redux/features/cart/cartSlice';

const Cartpage = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispach = useDispatch()

    const handleRemoveFromCart = (id) => {
        dispach(removeFromCart(id));
    };
    const handeleClearCart = () => {
        dispach(removeAll());
    };




    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh]">
                <img
                    src="/empty-cart.png"
                    alt="Empty cart"
                    className="w-64 opacity-80"
                />
                <h2 className="text-2xl font-semibold mt-4">Your cart is empty</h2>
                <p className="text-gray-500">Add books to your cart to continue shopping.</p>

                <Link
                    to="/all-books"
                    className="mt-6 btn btn-primary">
                    Browse Books
                </Link>
            </div>
        );
    }
    return (
        <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                    <div className="text-lg font-medium text-gray-900">Shopping cart</div>

                    <div className="ml-3 flex h-7 items-center">
                        <button onClick={handeleClearCart}
                            className="relative -m-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartItems.map((item) => (
                                <li key={item._id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            src={`/${item.coverImage}`}
                                            alt={item.title}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <Link to="/">{item.title}</Link>
                                                </h3>
                                                <p className="sm:ml-4">${item.newPrice}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500 capitalize">
                                                <strong>Category:</strong> {item.category || "N/A"}
                                            </p>
                                        </div>

                                        <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                                            <p className="text-gray-500">
                                                <strong>Qty:</strong> {item.qty ?? 1}
                                            </p>

                                            <div className="flex">
                                                <button
                                                    onClick={() => handleRemoveFromCart(item._id)}
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Subtotal */}
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>
                        $
                        {cartItems.reduce((sum, item) => {
                            const price = parseFloat(item.newPrice);
                            return sum + (isNaN(price) ? 0 : price);
                        }, 0)}
                    </p>
                </div>

                <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                </p>

                <div className="mt-6">
                    <Link to="/checkout"
                        className="flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                        Checkout
                    </Link>
                </div>

                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <Link to="/">
                        or
                        <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                        >
                            Continue Shopping →
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cartpage;
