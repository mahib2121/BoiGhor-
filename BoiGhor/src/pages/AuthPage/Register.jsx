import React from "react";
import { useForm } from "react-hook-form";

import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import useAuth from "../../Firebase/useAuth";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation()
    const nevigator = useNavigate()

    const getData = async (data) => {
        const profileIMG = data.photo[0];
        try {
            const result = await registerUser(data.email, data.password);
            console.log(result.user);
            const formData = new FormData()
            formData.append('image', profileIMG)

            axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_PhotoAPI}`, formData).then(res => {
                console.log(res.data.data.url);
                const userProfile = {
                    dispayname: data.name,
                    photoURL: res.data.data.url

                }
                updateUserProfile(userProfile).then(() => {
                    console.log('profile updated done  ');
                    nevigator(location.state || '/')
                })

            })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen px-4">
            <form onSubmit={handleSubmit(getData)} className="w-full max-w-sm">
                <div className="card bg-base-100 border border-base-200 shadow-xl rounded-xl p-6">

                    <h2 className="text-2xl font-semibold text-center mb-6">
                        Create Account
                    </h2>
                    <fieldset className="space-y-4">

                        {/* Name */}
                        <div>
                            <label className="label-text font-medium mb-1 block">
                                Name
                            </label>

                            <input
                                type="text"
                                {...register("name", {
                                    required: "Name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Name must be at least 2 characters",
                                    },
                                })}
                                className="input input-bordered w-full rounded-lg"
                                placeholder="Enter your name"
                            />

                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="label-text font-medium mb-1 block">
                                Email
                            </label>

                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Enter a valid email",
                                    },
                                })}
                                className="input input-bordered w-full rounded-lg"
                                placeholder="Enter your email"
                            />

                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>



                        {/* Password */}
                        <div>
                            <label className="label-text font-medium mb-1 block">
                                Password
                            </label>

                            <input
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 3,
                                        message: "Password must be at least 3 characters",
                                    },
                                })}
                                className="input input-bordered w-full rounded-lg"
                                placeholder="Enter password"
                            />

                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        {/* Photo Upload */}
                        <div>
                            <label className="label-text font-medium mb-1 block">
                                Profile Photo
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                {...register("photo", {
                                    required: "Photo is required",
                                })}
                                className="file-input file-input-bordered w-full rounded-lg"
                            />

                            {errors.photo && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.photo.message}
                                </p>
                            )}
                        </div>



                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <button type="button" className="link link-primary text-sm">
                                Forgot password?
                            </button>
                        </div>

                        {/* Register Button */}
                        <button className="btn btn-neutral w-full mt-2 rounded-lg">
                            Register
                        </button>

                        {/* Login Link */}
                        <p className="text-sm text-center mt-3">
                            Already have an account?{" "}
                            <Link to="/login" state={location.state} className="link link-primary">
                                Login Now
                            </Link>

                        </p>
                        <SocialLogin></SocialLogin>
                    </fieldset>

                </div>
            </form>
        </div>
    );
};

export default Register;
