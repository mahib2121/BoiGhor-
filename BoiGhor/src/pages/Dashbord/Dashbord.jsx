import React from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import {
    LayoutDashboard,
    ShoppingBag,
    CreditCard,
    BookOpen,
    PlusCircle,
    ClipboardList,
    Users,
    Menu,
    Home,
    LogOut
} from "lucide-react";
import useRole from "../../hook/useRole";

const Dashboard = () => {
    const [role, roleLoading] = useRole();

    // Loading State
    if (roleLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-base-100">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    // Helper component for Links to keep code clean
    const SidebarLink = ({ to, icon: Icon, label }) => (
        <li>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                        ? "bg-primary text-white font-semibold shadow-md"
                        : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                    }`
                }
            >
                <Icon size={20} />
                <span>{label}</span>
            </NavLink>
        </li>
    );

    return (
        <div className="drawer lg:drawer-open bg-base-100">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* --- Main Content Area --- */}
            <div className="drawer-content flex flex-col min-h-screen">

                {/* Navbar (Mobile Only / Header) */}
                <div className="w-full navbar bg-base-100 border-b border-base-200 sticky top-0 z-10 lg:hidden">
                    <div className="flex-none">
                        <label
                            htmlFor="dashboard-drawer"
                            className="btn btn-square btn-ghost"
                        >
                            <Menu size={24} />
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2 text-xl font-bold">Dashboard</div>
                </div>

                {/* Dashboard Content Outlet */}
                <div className="p-6 md:p-10 bg-base-200/30 flex-1">
                    <Outlet />
                </div>
            </div>

            {/* --- Sidebar --- */}
            <div className="drawer-side z-20">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                <aside className="bg-base-100 w-72 min-h-full border-r border-base-200 flex flex-col">

                    {/* Sidebar Brand/Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-base-200">
                        <Link to="https://nimble-flan-bf9163.netlify.app" className="flex items-center gap-2 font-bold text-2xl text-primary">
                            <BookOpen className="text-primary" />
                            <span>BoiGhor</span>
                        </Link>
                    </div>

                    {/* Scrollable Menu Area */}
                    <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">

                        {/* 1. General User Menu */}
                        <div className="pb-2">
                            <p className="px-4 text-xs font-bold text-base-content/40 uppercase tracking-wider mb-2 mt-2">
                                Menu
                            </p>
                            <ul className="menu menu-md p-0 gap-1">
                                <SidebarLink to="/" icon={Home} label="Home" />
                                <SidebarLink to="/dashboard/my-orders" icon={ShoppingBag} label="My Orders" />
                                <SidebarLink to="/dashboard/my-payment" icon={CreditCard} label="Payment History" />
                            </ul>
                        </div>

                        {/* 2. Librarian / Admin Menu */}
                        {(role === "admin" || role === "librarian") && (
                            <div className="pb-2">
                                <div className="divider my-2"></div>
                                <p className="px-4 text-xs font-bold text-base-content/40 uppercase tracking-wider mb-2">
                                    Management
                                </p>
                                <ul className="menu menu-md p-0 gap-1">
                                    <SidebarLink to="/dashboard/OrderManagement" icon={ClipboardList} label="Order Management" />
                                    <SidebarLink to="/dashboard/AddBook" icon={PlusCircle} label="Add Book" />
                                    <SidebarLink to="/dashboard/UpdateBook" icon={LayoutDashboard} label="Manage Books" />
                                </ul>
                            </div>
                        )}

                        {/* 3. Admin Only Menu */}
                        {role === "admin" && (
                            <div className="pb-2">
                                <div className="divider my-2"></div>
                                <p className="px-4 text-xs font-bold text-base-content/40 uppercase tracking-wider mb-2">
                                    System
                                </p>
                                <ul className="menu menu-md p-0 gap-1">
                                    <SidebarLink to="/dashboard/UserManagement" icon={Users} label="All Users" />
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Bottom User Section (Optional) */}
                    <div className="p-4 border-t border-base-200">
                        <Link to="/" className="btn btn-outline btn-error btn-sm w-full gap-2">
                            <LogOut size={16} /> Exit Dashboard
                        </Link>
                    </div>

                </aside>
            </div>
        </div>
    );
};

export default Dashboard;