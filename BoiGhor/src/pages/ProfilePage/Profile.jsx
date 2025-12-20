import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { User, Mail, Shield, Camera, Save, Loader2 } from "lucide-react";
import useAxiosSecure from "../../hook/axiosSecure";
import useAuth from "../../Firebase/useAuth";

const Profile = () => {
    const axiosSecure = useAxiosSecure();
    const { user, updateUserProfile } = useAuth();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Fetch Profile Data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // If backend needs email query, update URL accordingly. 
                // Assuming /users/profile uses the verified token to identify the user.
                const res = await axiosSecure.get(`/users/profile?email=${user?.email}`);
                setProfile(res.data);
            } catch (err) {
                console.error("Profile fetch error:", err);
                // Fallback to Firebase user data if backend fetch fails
                setProfile({
                    displayName: user?.displayName,
                    email: user?.email,
                    photoURL: user?.photoURL,
                    role: "user"
                });
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchProfile();
        }
    }, [axiosSecure, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const form = e.target;
        const displayName = form.displayName.value;
        const photoURL = form.photoURL.value;

        try {
            // 1. Update Firebase Auth Profile
            await updateUserProfile(displayName, photoURL);

            // 2. Update MongoDB Database
            const res = await axiosSecure.patch("/users/profile", {
                displayName,
                photoURL
            });

            if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Profile Updated",
                    text: "Your profile details have been saved successfully.",
                    showConfirmButton: false,
                    timer: 1500
                });

                // Update local state to show changes immediately
                setProfile(prev => ({ ...prev, displayName, photoURL }));
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to update profile. Please try again.", "error");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">

            {/* --- Page Title --- */}
            <h2 className="text-3xl font-bold mb-8 text-base-content flex items-center gap-2">
                <User className="text-primary" /> My Profile
            </h2>

            <div className="card bg-base-100 shadow-xl border border-base-200">
                <div className="card-body">

                    {/* --- Top Section: Avatar & Info --- */}
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                        <div className="avatar">
                            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img
                                    src={profile?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                    alt="Profile"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="text-center md:text-left space-y-1">
                            <h3 className="text-2xl font-bold">{profile?.displayName || "User"}</h3>
                            <p className="text-base-content/60">{profile?.email}</p>
                            <div className="badge badge-primary badge-outline capitalize mt-2 px-4 py-3 font-medium">
                                {profile?.role || "User"}
                            </div>
                        </div>
                    </div>

                    <div className="divider"></div>

                    {/* --- Form Section --- */}
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Name Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium flex items-center gap-2">
                                    <User size={16} /> Full Name
                                </span>
                            </label>
                            <input
                                type="text"
                                name="displayName"
                                defaultValue={profile?.displayName}
                                className="input input-bordered w-full focus:input-primary transition-all"
                                required
                            />
                        </div>

                        {/* Email Input (Read-only) */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium flex items-center gap-2">
                                    <Mail size={16} /> Email Address
                                </span>
                            </label>
                            <input
                                type="text"
                                value={profile?.email}
                                readOnly
                                className="input input-bordered w-full bg-base-200/50 text-base-content/60 cursor-not-allowed"
                            />
                        </div>

                        {/* Photo URL Input */}
                        <div className="form-control md:col-span-2">
                            <label className="label">
                                <span className="label-text font-medium flex items-center gap-2">
                                    <Camera size={16} /> Profile Photo URL
                                </span>
                            </label>
                            <input
                                type="url"
                                name="photoURL"
                                defaultValue={profile?.photoURL}
                                placeholder="https://example.com/my-photo.jpg"
                                className="input input-bordered w-full focus:input-primary transition-all"
                                required
                            />
                        </div>

                        {/* Role Input (Read-only) */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium flex items-center gap-2">
                                    <Shield size={16} /> Account Role
                                </span>
                            </label>
                            <input
                                type="text"
                                value={profile?.role || "User"}
                                readOnly
                                className="input input-bordered w-full bg-base-200/50 text-base-content/60 cursor-not-allowed capitalize"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2 mt-6 flex justify-end">
                            <button
                                type="submit"
                                className="btn btn-primary px-8 shadow-lg hover:shadow-primary/40 transition-all w-full md:w-auto"
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} /> Updating...
                                    </>
                                ) : (
                                    <>
                                        <Save size={20} /> Save Changes
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;