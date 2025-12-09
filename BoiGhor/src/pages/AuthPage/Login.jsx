import React from "react";
import { useForm } from "react-hook-form";

import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import useAuth from "../../Firebase/useAuth";


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loginUser } = useAuth();
    const location = useLocation()
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        try {
            const res = await loginUser(data.email, data.password);
            console.log(res.user);
            navigate(location.state)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-sm bg-base-200 p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold text-center mb-4">Login</h2>

                {/* Email */}
                <label className="label">Email</label>
                <input
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="Enter your email"
                    {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                    </p>
                )}

                {/* Password */}
                <label className="label mt-4">Password</label>
                <input
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Minimum length is 6 characters",
                        },
                    })}
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                    </p>
                )}

                <button className="btn btn-neutral w-full mt-6" type="submit">
                    Login
                </button>
                <p>Alreaday have a account  <Link state={location.state} to='/register' className="link link-primary" >Register Now  </Link></p>
                <SocialLogin></SocialLogin>
            </form>
        </div>
    );
};

export default Login;
