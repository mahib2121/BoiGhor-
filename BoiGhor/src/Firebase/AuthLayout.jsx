import React from "react";
import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Star } from "lucide-react";

const AuthLayout = () => {
    return (
        <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-base-100">

            {/* --- Left Section: Form Container --- */}
            <div className="relative flex flex-col justify-center items-center px-6 md:px-16 lg:px-24 py-12 bg-base-100">

                {/* Back to Home Button */}
                <Link
                    to="/"
                    className="absolute top-6 left-6 md:top-8 md:left-8 btn btn-ghost btn-sm gap-2 text-base-content/60 hover:text-primary transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span className="hidden sm:inline">Back to Home</span>
                </Link>

                {/* Logo Brand (Mobile/Tablet visible, Desktop optional) */}
                <div className="mb-8 lg:hidden">
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
                        <BookOpen className="text-primary" /> BoiGhor
                    </Link>
                </div>

                {/* Main Form Content (Rendered from Login/Register) */}
                <div className="w-full max-w-md">
                    <Outlet />
                </div>

                {/* Footer Copyright */}
                <div className="mt-8 text-center text-xs text-base-content/40">
                    &copy; {new Date().getFullYear()} BoiGhor. All rights reserved.
                </div>
            </div>

            {/* --- Right Section: Visual & Branding (Desktop Only) --- */}
            <div className="hidden lg:flex flex-col justify-center items-center relative bg-primary/5 p-12 overflow-hidden">

                {/* Animated Background Blobs */}
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px]" />

                {/* Content Container */}
                <div className="relative z-10 max-w-lg text-center">

                    {/* Animated Floating Icon/Image */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="mb-8 inline-block"
                    >
                        <div className="w-48 h-64 bg-gradient-to-tr from-primary to-secondary rounded-lg shadow-2xl flex items-center justify-center transform rotate-[-6deg] border-4 border-base-100">
                            <BookOpen size={64} className="text-white opacity-80" />
                        </div>
                    </motion.div>

                    <h2 className="text-4xl font-bold text-base-content mb-4 leading-tight">
                        Discover Your Next <br />
                        <span className="text-primary">Great Adventure</span>
                    </h2>

                    <p className="text-lg text-base-content/70 mb-8 leading-relaxed">
                        "A room without books is like a body without a soul."
                        <br />— <span className="italic">Marcus Tullius Cicero</span>
                    </p>

                    {/* Trust Indicators */}
                    <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={20} className="fill-orange-400 text-orange-400" />
                        ))}
                    </div>
                    <p className="text-sm text-base-content/50 mt-2">Trusted by 50k+ Readers</p>
                </div>
            </div>

        </div>
    );
};

export default AuthLayout;