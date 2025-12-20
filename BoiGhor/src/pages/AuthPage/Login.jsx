import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";
import Swal from "sweetalert2";

import SocialLogin from "./SocialLogin";
import useAuth from "../../Firebase/useAuth";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loginUser } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            // 1️⃣ Login with Firebase
            const result = await loginUser(data.email, data.password);

            // 2️⃣ Force refresh Firebase ID token (CRITICAL)
            await result.user.getIdToken(true);

            Swal.fire({
                icon: "success",
                title: "Welcome back!",
                text: "Login successful",
                timer: 1500,
                showConfirmButton: false,
            });

            // 3️⃣ Navigate
            navigate(location.state || "/", { replace: true });

        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text:
                    error?.response?.data?.message ||
                    error.message ||
                    "Invalid email or password",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200/50 px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-xl border border-base-200"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold">Welcome Back</h2>
                    <p className="text-base-content/60 mt-2">
                        Sign in to access your account
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Email Address</span>
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
                            <input
                                type="email"
                                className={`input input-bordered w-full pl-10 ${errors.email ? "input-error" : ""}`}
                                {...register("email", { required: "Email is required" })}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-error text-xs mt-1 flex gap-1">
                                <AlertCircle size={12} /> {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Password</span>
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
                            <input
                                type="password"
                                className={`input input-bordered w-full pl-10 ${errors.password ? "input-error" : ""}`}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                            />
                        </div>
                        {errors.password && (
                            <p className="text-error text-xs mt-1 flex gap-1">
                                <AlertCircle size={12} /> {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary w-full"
                    >
                        {isLoading ? (
                            <span className="loading loading-spinner"></span>
                        ) : (
                            <>
                                Sign In <LogIn size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="divider">OR CONTINUE WITH</div>
                <SocialLogin />

                <p className="text-center mt-6 text-sm">
                    Don’t have an account?{" "}
                    <Link to="/register" className="link link-primary font-semibold">
                        Register
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
