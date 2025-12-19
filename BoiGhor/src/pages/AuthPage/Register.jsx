import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../Firebase/useAuth";
import SocialLogin from "./SocialLogin";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = async (data) => {
        try {
            // 1. Firebase register
            const result = await registerUser(data.email, data.password);

            // 2. Upload image
            const formData = new FormData();
            formData.append("image", data.photo[0]);

            const imgRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_PhotoAPI}`,
                formData
            );

            const photoURL = imgRes.data.data.url;

            // 3. Update Firebase profile
            await updateUserProfile({
                displayName: data.name,
                photoURL
            });

            // 4. Get Firebase token
            const token = await result.user.getIdToken();

            // 5. Save user in DB
            await axios.post(
                "http://localhost:3000/users",
                {
                    email: data.email,
                    displayName: data.name,
                    photoURL
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            navigate(location.state || "/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
                <div className="card p-6 shadow-xl">

                    <h2 className="text-2xl font-semibold text-center mb-4">
                        Create Account
                    </h2>

                    <input
                        placeholder="Name"
                        {...register("name", { required: true })}
                        className="input input-bordered w-full mb-3"
                    />

                    <input
                        placeholder="Email"
                        {...register("email", { required: true })}
                        className="input input-bordered w-full mb-3"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", { required: true, minLength: 6 })}
                        className="input input-bordered w-full mb-3"
                    />

                    <input
                        type="file"
                        {...register("photo", { required: true })}
                        className="file-input file-input-bordered w-full mb-4"
                    />

                    <button className="btn btn-neutral w-full">
                        Register
                    </button>
                    <button>
                        <SocialLogin></SocialLogin>
                    </button>


                    <p className="text-center mt-3 text-sm">
                        Already have an account?
                        <Link to="/login" className="link link-primary ml-1">
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;
