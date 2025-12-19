import React from "react";
import { NavLink, Outlet } from "react-router";
import useRole from "../../hook/useRole";

const Dashboard = () => {
    const [role, roleLoading] = useRole();

    // Handle role loading
    if (roleLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="drawer lg:drawer-open">
            <input
                id="dashboard-drawer"
                type="checkbox"
                className="drawer-toggle"
            />

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

                {/* Dynamic page */}
                <div className="p-6">
                    <Outlet />
                </div>
            </div>

            {/* SIDEBAR */}
            <div className="drawer-side">
                <label
                    htmlFor="dashboard-drawer"
                    className="drawer-overlay"
                ></label>

                <aside className="bg-base-200 w-64 min-h-full p-4">
                    <ul className="menu text-base-content">

                        {/* Common */}
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? "active font-bold" : ""
                                }
                            >
                                Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/my-orders"
                                className={({ isActive }) =>
                                    isActive ? "active font-bold" : ""
                                }
                            >
                                My Orders
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/my-payment"
                                className={({ isActive }) =>
                                    isActive ? "active font-bold" : ""
                                }
                            >
                                My Payment
                            </NavLink>
                        </li>

                        {/* Admin only */}
                        {role === "admin" && (
                            <>
                                <div className="divider">Admin</div>

                                <li>
                                    <NavLink
                                        to="/dashboard/UserManagement"
                                        className={({ isActive }) =>
                                            isActive ? "active font-bold" : ""
                                        }
                                    >
                                        User Management
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/AddBook"
                                        className={({ isActive }) =>
                                            isActive ? "active font-bold" : ""
                                        }
                                    >
                                        Add Book
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/UpdateBook"
                                        className={({ isActive }) =>
                                            isActive ? "active font-bold" : ""
                                        }
                                    >
                                        Manage Book
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/OrderManagement"
                                        className={({ isActive }) =>
                                            isActive ? "active font-bold" : ""
                                        }
                                    >
                                        Order Management
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </aside>
            </div>
        </div>
    );
};

export default Dashboard;
