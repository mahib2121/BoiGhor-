import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import { User, Mail, Lock, Camera, UserPlus, AlertCircle } from "lucide-react";

import useAuth from "../../Firebase/useAuth";
import SocialLogin from "./SocialLogin";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            // 1️⃣ Upload image to ImgBB
            const formData = new FormData();
            formData.append("image", data.photo[0]);

            const imgRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_PhotoAPI}`,
                formData
            );

            if (!imgRes.data.success) {
                throw new Error("Image upload failed");
            }

            const photoURL = imgRes.data.data.url;
            const result = await registerUser(data.email, data.password);
            const token = await result.user.getIdToken(true);

            // 4️⃣ Update Firebase profile
            await updateUserProfile(data.name, photoURL);

            // 5️⃣ Save user to MongoDB (send token manually)
            const userInfo = {
                name: data.name,
                email: data.email,
                photoURL,
            };

            const res = await axios.post(
                "http://localhost:3000/users",
                userInfo,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data?.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Welcome!",
                    text: "Account created successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });

                navigate(location.state || "/");
            }

        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text:
                    error?.response?.data?.message ||
                    error.message ||
                    "Something went wrong",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200/50 px-4 py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-xl border border-base-200"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold">Create Account</h2>
                    <p className="text-base-content/60 mt-2">
                        Join us to explore amazing books
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Full Name</span>
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
                            <input
                                type="text"
                                className={`input input-bordered w-full pl-10 ${errors.name ? "input-error" : ""}`}
                                {...register("name", { required: "Name is required" })}
                            />
                        </div>
                        {errors.name && (
                            <p className="text-error text-xs mt-1 flex gap-1">
                                <AlertCircle size={12} /> {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Email</span>
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
                                    minLength: { value: 6, message: "Minimum 6 characters" },
                                })}
                            />
                        </div>
                        {errors.password && (
                            <p className="text-error text-xs mt-1 flex gap-1">
                                <AlertCircle size={12} /> {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Photo */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Profile Picture</span>
                        </label>
                        <input
                            type="file"
                            className={`file-input file-input-bordered w-full ${errors.photo ? "file-input-error" : ""}`}
                            {...register("photo", { required: "Profile picture required" })}
                        />
                        {errors.photo && (
                            <p className="text-error text-xs mt-1 flex gap-1">
                                <AlertCircle size={12} /> {errors.photo.message}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary w-full mt-4"
                    >
                        {isLoading ? (
                            <span className="loading loading-spinner"></span>
                        ) : (
                            <>
                                Register <UserPlus size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="divider mt-6">OR REGISTER WITH</div>
                <SocialLogin />

                <p className="text-center mt-6 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="link link-primary font-semibold">
                        Login
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
