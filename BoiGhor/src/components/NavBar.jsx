import React from 'react';
import { Link } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';

const NavBar = ({ isLoggedIn, user }) => {
    //isLoggedIn = true
    return (
        <div className="navbar bg-base-100 shadow-sm px-5">


            <div className="flex-1">
                <Link to="/" className="text-2xl font-semibold">BoiGhor</Link>
            </div>

            {/* Search + Links */}
            <div className="flex gap-4 items-center">

                {/* Searchbox */}
                <div className="form-control">
                    <input
                        type="text"
                        placeholder="Search books..."
                        className="input input-bordered w-48 md:w-64"
                    />
                </div>


                <Link to="/all-books" className="btn btn-ghost">All Books</Link>
                <Link to="/dashboard" className="btn btn-ghost">Dashboard</Link>



                {isLoggedIn ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="profile"
                                    src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                />
                            </div>
                        </div>
                        <ul tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
                            <li><a>Profile</a></li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
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
