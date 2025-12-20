import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Search,
    Trash2,
    Shield,
    UserCheck,
    UserCog
} from "lucide-react";
import useAxiosSecure from "../../hook/axiosSecure";

const UserManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    const handleRoleChange = async (user, newRole) => {
        try {
            const res = await axiosSecure.patch(`/users/role/${user._id}`, { role: newRole });
            if (res.data.modifiedCount > 0) {
                refetch();
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                });
                Toast.fire({
                    icon: 'success',
                    title: `${user.displayName}'s role updated to ${newRole}`
                });
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to update role.", "error");
        }
    };

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete user!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/users/${user._id}`);
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire("Deleted!", "User has been removed.", "success");
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire("Error", "Failed to delete user.", "error");
                }
            }
        });
    };

    // Filter Users
    const filteredUsers = users.filter(user =>
        user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Helper for Role Colors
    const getRoleColor = (role) => {
        switch (role) {
            case 'admin': return 'badge-error text-white';
            case 'librarian': return 'badge-info text-white';
            default: return 'badge-ghost';
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="p-6">

            {/* --- Header Section --- */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2 text-base-content">
                        <Users className="text-primary" /> User Management
                    </h2>
                    <p className="text-sm text-gray-500">
                        Total Users: <span className="font-bold">{users.length}</span>
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="input input-bordered w-full pl-10 h-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* --- Table Section --- */}
            <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table table-md w-full">
                        <thead className="bg-base-200/50 text-base-content">
                            <tr>
                                <th>#</th>
                                <th>User Profile</th>
                                <th>Current Role</th>
                                <th>Change Access</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {filteredUsers.map((user, index) => (
                                    <motion.tr
                                        key={user._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="hover:bg-base-200/30 transition-colors"
                                    >
                                        <th>{index + 1}</th>

                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar placeholder">
                                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-10 h-10 bg-primary/10 text-primary flex items-center justify-center font-bold">
                                                        {user.photoURL ? (
                                                            <img src={user.photoURL} alt={user.displayName} />
                                                        ) : (
                                                            user.displayName?.charAt(0).toUpperCase() || "U"
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-sm">{user.displayName}</div>
                                                    <div className="text-xs opacity-50">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <div className={`badge ${getRoleColor(user.role)} gap-1 capitalize font-medium`}>
                                                {user.role === 'admin' && <Shield size={12} />}
                                                {user.role === 'librarian' && <UserCog size={12} />}
                                                {(!user.role || user.role === 'user') && <UserCheck size={12} />}
                                                {user.role || 'User'}
                                            </div>
                                        </td>

                                        <td>
                                            <select
                                                className="select select-bordered select-sm w-full max-w-[140px]"
                                                value={user.role || "user"}
                                                onChange={(e) => handleRoleChange(user, e.target.value)}
                                            >
                                                <option value="user">User</option>
                                                <option value="librarian">Librarian</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>

                                        <td className="text-right">
                                            <button
                                                onClick={() => handleDeleteUser(user)}
                                                className="btn btn-sm btn-square btn-ghost text-error hover:bg-error/10"
                                                title="Delete User"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>

                    {filteredUsers.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            No users found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserManagement;