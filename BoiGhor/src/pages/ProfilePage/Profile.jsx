import { useEffect, useState } from "react";
import useAxiosSecure from "../../hook/axiosSecure";
import useAuth from "../../Firebase/useAuth";
import Swal from "sweetalert2";

const Profile = () => {
    const axiosSecure = useAxiosSecure();
    const { user, updateUserProfile } = useAuth();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const res = await axiosSecure.get("/users/profile");
            setProfile(res.data);
            setLoading(false);
        };
        fetchProfile();
    }, [axiosSecure]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const displayName = form.displayName.value;
        const photoURL = form.photoURL.value;

        try {
            // Update Firebase Auth
            await updateUserProfile(displayName, photoURL);

            // Update MongoDB
            const res = await axiosSecure.patch("/users/profile", {
                displayName,
                photoURL
            });

            if (res.data.modifiedCount > 0) {
                Swal.fire("Success", "Profile updated", "success");
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Update failed", "error");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-xl mx-auto bg-base-200 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="label">Name</label>
                    <input
                        name="displayName"
                        defaultValue={profile.displayName}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div>
                    <label className="label">Photo URL</label>
                    <input
                        name="photoURL"
                        defaultValue={profile.photoURL}
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="label">Email</label>
                    <input
                        value={profile.email}
                        disabled
                        className="input input-bordered w-full bg-base-300"
                    />
                </div>

                <div>
                    <label className="label">Role</label>
                    <input
                        value={profile.role}
                        disabled
                        className="input input-bordered w-full bg-base-300 capitalize"
                    />
                </div>

                <button className="btn btn-primary w-full">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default Profile;
