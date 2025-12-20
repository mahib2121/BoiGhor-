// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector } from "react-redux";
// import useAuth from '../Firebase/useAuth';
// import logo from '../assets/MainLogo2.png'
// const NavBar = () => {

//     const { user, logoutUser } = useAuth();
//     const cartItems = useSelector((state) => state.cart.items);

//     return (
//         <div className="navbar bg-base-100 shadow-sm px-5">

//             <div className="flex">
//                 <img src={logo} alt="Logo" className="w-32 h-auto" />
//                 <Link to="/" className="text-2xl font-semibold">BoiGhor</Link>


//             </div>

//             <div className="flex gap-4 items-center">

//                 <div className="form-control">
//                     <input
//                         type="text"
//                         placeholder="Search books..."
//                         className="input input-bordered w-48 md:w-64"
//                     />
//                 </div>

//                 <Link to="/all-books" className="btn btn-ghost">All Books</Link>
//                 <Link to="/dashboard" className="btn btn-ghost">Dashboard</Link>

//                 {/* Cart Icon */}
//                 <Link to="/cart" className="btn btn-ghost btn-circle relative">
//                     <div className="indicator">
//                         <span className="indicator-item badge badge-primary text-white">
//                             {cartItems.length}
//                         </span>
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-6 w-6"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9"
//                             />
//                         </svg>
//                     </div>
//                 </Link>

//                 {/* Auth Section */}
//                 {user ? (
//                     <div className="dropdown dropdown-end">
//                         <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//                             <div className="w-10 rounded-full">
//                                 <img
//                                     alt="profile"
//                                     src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
//                                 />
//                             </div>
//                         </div>

//                         <ul
//                             tabIndex={0}
//                             className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
//                         >
//                             <li><Link to="/profile">Profile</Link></li>
//                             <li><Link to="/settings">Settings</Link></li>
//                             <li>
//                                 <button onClick={logoutUser} className="text-red-500">
//                                     Logout
//                                 </button>
//                             </li>
//                         </ul>
//                     </div>
//                 ) : (
//                     <div className="flex gap-2">
//                         <Link to="/login" className="btn btn-sm btn-outline">Login</Link>
//                         <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
//                     </div>
//                 )}
//             </div>

//         </div>
//     );
// };

// export default NavBar;


import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, ShoppingCart, User, Menu, X,
    LogOut, Settings, ChevronDown, LayoutDashboard, BookOpen
} from 'lucide-react';
import useAuth from '../Firebase/useAuth';
import logo from '../assets/MainLogo2.png';

const NavBar = () => {
    const { user, logoutUser } = useAuth();
    const cartItems = useSelector((state) => state.cart.items);

    // UI States
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // Close mobile menu when route changes
    const location = useLocation();
    React.useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-base-200 bg-base-100/80 backdrop-blur-xl transition-all duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between gap-4">

                    {/* --- Logo Section --- */}
                    <Link to="/" className="flex items-center gap-3 group">
                        {/* Wrapper for logo to give it that modern 'box' look */}
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                            <img src={logo} alt="BoiGhor" className="h-6 w-auto object-contain" />
                        </div>
                        <span className="hidden sm:block font-bold text-xl tracking-tight group-hover:text-primary transition-colors">
                            BoiGhor
                        </span>
                    </Link>

                    {/* --- Search Bar (Desktop) --- */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className={`relative w-full transition-all duration-300 ${isSearchFocused ? 'scale-[1.02]' : ''}`}>
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/50" />
                            <input
                                type="text"
                                placeholder="Search for books, authors..."
                                className="input input-bordered w-full h-10 pl-10 bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all duration-300 rounded-lg"
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                            />
                        </div>
                    </div>

                    {/* --- Navigation Links (Desktop) --- */}
                    <div className="hidden lg:flex items-center gap-1">
                        <Link to="/all-books" className="btn btn-ghost btn-sm text-base-content/70 hover:text-primary hover:bg-base-200">
                            <BookOpen className="h-4 w-4 mr-2" />
                            All Books
                        </Link>
                        <Link to="/dashboard" className="btn btn-ghost btn-sm text-base-content/70 hover:text-primary hover:bg-base-200">
                            <LayoutDashboard className="h-4 w-4 mr-2" />
                            Dashboard
                        </Link>
                    </div>

                    {/* --- Right Actions Section --- */}
                    <div className="flex items-center gap-2">

                        {/* Mobile Search Icon Toggle (Visible only on small screens) */}
                        <button className="btn btn-ghost btn-circle btn-sm md:hidden">
                            <Search className="h-5 w-5" />
                        </button>

                        {/* Cart Icon */}
                        <Link to="/cart" className="btn btn-ghost btn-circle btn-sm relative group">
                            <ShoppingCart className="h-5 w-5 group-hover:text-primary transition-colors" />
                            {cartItems.length > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm"
                                >
                                    {cartItems.length}
                                </motion.span>
                            )}
                        </Link>

                        {/* Auth Section */}
                        {user ? (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring-offset-2 hover:ring-2 ring-primary/20 transition-all">
                                    <div className="w-9 rounded-full">
                                        <img
                                            src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                            alt="profile"
                                        />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-56 border border-base-200">
                                    <div className="px-4 py-2 border-b border-base-200 mb-2">
                                        <p className="font-semibold truncate">{user.displayName || "User"}</p>
                                        <p className="text-xs text-base-content/60">Member</p>
                                    </div>
                                    <li>
                                        <Link to="/profile" className="flex items-center gap-2">
                                            <User className="h-4 w-4" /> Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/" className="flex items-center gap-2">
                                            <Settings className="h-4 w-4" /> Settings
                                        </Link>
                                    </li>
                                    <div className="divider my-1"></div>
                                    <li>
                                        <button onClick={logoutUser} className="text-error hover:bg-error/10">
                                            <LogOut className="h-4 w-4" /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="hidden sm:flex items-center gap-2">
                                <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
                                <Link to="/register" className="btn btn-primary btn-sm text-white shadow-md hover:shadow-lg transition-all">
                                    Register
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Toggle Button */}
                        <button
                            className="btn btn-ghost btn-circle btn-sm lg:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Mobile Menu (AnimatePresence) --- */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden border-t border-base-200 bg-base-100"
                    >
                        <div className="px-4 py-4 space-y-3">
                            {/* Mobile Search Input */}
                            <div className="relative md:hidden mb-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/50" />
                                <input
                                    type="text"
                                    placeholder="Search books..."
                                    className="input input-bordered input-sm w-full pl-10"
                                />
                            </div>

                            <Link to="/all-books" className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-base-200 transition-colors">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary"><BookOpen size={18} /></div>
                                <span className="font-medium">All Books</span>
                            </Link>

                            <Link to="/dashboard" className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-base-200 transition-colors">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary"><LayoutDashboard size={18} /></div>
                                <span className="font-medium">Dashboard</span>
                            </Link>

                            {!user && (
                                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-base-200 mt-2">
                                    <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
                                    <Link to="/register" className="btn btn-primary btn-sm text-white">Register</Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default NavBar;