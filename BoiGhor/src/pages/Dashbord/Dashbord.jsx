import React from "react";
import { NavLink, Outlet } from "react-router";
import useRole from "../../hook/useRole";

const Dashboard = () => {
    const [role, roleLoading] = useRole();
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


            <div className="drawer-content flex flex-col">

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

            <div className="drawer-side">
                <label
                    htmlFor="dashboard-drawer"
                    className="drawer-overlay"
                ></label>

                <aside className="bg-base-200 w-64 min-h-full p-4">
                    <ul className="menu text-base-content">
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
                        {/* Librarian + Admin */}
                        {(role === "admin" || role === "librarian") && (
                            <>
                                <div className="divider">Librarian</div>

                                <li>
                                    <NavLink to="/dashboard/OrderManagement">
                                        Order Management
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/AddBook">
                                        Add Book
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/UpdateBook">
                                        Manage Book
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Admin only */}
                        {role === "admin" && (
                            <>
                                <div className="divider">Admin</div>

                                <li>
                                    <NavLink to="/dashboard/UserManagement">
                                        User Management
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
