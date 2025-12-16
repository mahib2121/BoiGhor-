import React from "react";
import { Link, NavLink, Outlet } from "react-router";

const Dashboard = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* PAGE CONTENT */}
            <div className="drawer-content flex flex-col">

                {/* Navbar */}
                <div className="w-full navbar bg-base-300 px-4">
                    <label
                        htmlFor="dashboard-drawer"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            className="w-6 h-6"
                        >
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>
                    <h2 className="text-xl font-semibold">Dashboard</h2>
                </div>


                <div className="p-6">
                    <Outlet />
                </div>
            </div>

            {/* SIDEBAR */}
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                <aside className="bg-base-200 w-64 min-h-full p-4">
                    <ul className="menu text-base-content">

                        {/* Home */}
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? "active font-bold" : ""
                                }
                            >
                                <span>Home</span>
                            </NavLink>
                        </li>

                        {/* My Orders */}
                        <li>
                            <NavLink
                                to="/dashboard/my-orders"
                                className={({ isActive }) =>
                                    isActive ? "active font-bold" : ""
                                }
                            >
                                <span>My Orders</span>
                            </NavLink>
                        </li>

                        {/* Settings */}
                        <li>
                            <NavLink
                                to="/dashboard/my-Payment"
                                className={({ isActive }) =>
                                    isActive ? "active font-bold" : ""
                                }
                            >
                                <span>My Payment </span>
                            </NavLink>
                        </li>

                    </ul>
                </aside>
            </div>

        </div>
    );
};

export default Dashboard;
