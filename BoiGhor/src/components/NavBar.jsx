import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import useAuth from '../Firebase/useAuth';

const NavBar = () => {

    const { user, logoutUser } = useAuth();
    const cartItems = useSelector((state) => state.cart.items);

    return (
        <div className="navbar bg-base-100 shadow-sm px-5">

            <div className="flex-1">
                <Link to="/" className="text-2xl font-semibold">BoiGhor</Link>
            </div>

            <div className="flex gap-4 items-center">

                <div className="form-control">
                    <input
                        type="text"
                        placeholder="Search books..."
                        className="input input-bordered w-48 md:w-64"
                    />
                </div>

                <Link to="/all-books" className="btn btn-ghost">All Books</Link>
                <Link to="/dashboard" className="btn btn-ghost">Dashboard</Link>

                {/* Cart Icon */}
                <Link to="/cart" className="btn btn-ghost btn-circle relative">
                    <div className="indicator">
                        <span className="indicator-item badge badge-primary text-white">
                            {cartItems.length}
                        </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9"
                            />
                        </svg>
                    </div>
                </Link>

                {/* Auth Section */}
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="profile"
                                    src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                />
                            </div>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
                        >
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/settings">Settings</Link></li>
                            <li>
                                <button onClick={logoutUser} className="text-red-500">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link to="/login" className="btn btn-sm btn-outline">Login</Link>
                        <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
                    </div>
                )}
            </div>

        </div>
    );
};

export default NavBar;
