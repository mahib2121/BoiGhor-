import React from "react";
import { Link, Outlet } from "react-router-dom";
// import Logo from "../components/logo";
// import LpageImg from "../assets/authImage.png";

const AuthLayout = () => {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">

            {/* Left Section */}
            <div className="flex flex-col justify-center px-6 md:px-16 lg:px-20 py-10">

                {/* Logo */}
                <Link to="/" className="mb-8">
                    {/* <Logo /> */}
                </Link>

                {/* Welcome Text */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                    Welcome Back
                </h2>

                <p className="text-gray-600 mb-10 text-sm md:text-base">
                    Sign in to continue accessing your dashboard and all features.
                </p>

                {/* Auth Form */}
                <div className="w-full max-w-sm">
                    <Outlet />
                </div>
            </div>

            {/* Right Section (Image Background) */}
            <div className="hidden lg:flex items-center justify-center bg-gray-50 relative overflow-hidden">

                {/* Background Image */}
                {/* <img
                    src={LpageImg}
                    alt="Login"
                    className="w-[85%] max-w-xl object-contain drop-shadow-xl"
                /> */}

                {/* Decorative Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
            </div>

        </div>
    );
};

export default AuthLayout;
