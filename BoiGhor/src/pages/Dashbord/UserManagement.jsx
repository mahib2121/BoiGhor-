import React from 'react';
import useAxiosSecure from '../../hook/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2'; // Assuming you have installed sweetalert2
import { FaTrashAlt, FaUsers } from 'react-icons/fa'; // Assuming react-icons is installed

const UserManagement = () => {
    const axiosSecure = useAxiosSecure();

    // 1. Destructure refetch and isLoading from useQuery
    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    // 2. Handle Make Admin (Update Operation)
    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch(); // Update the UI immediately
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.
                            displayName} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => console.error(error));
    };

    // 3. Handle Delete User (Delete Operation)
    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch(); // Update the UI immediately
                            Swal.fire("Deleted!", "User has been deleted.", "success");
                        }
                    })
                    .catch(error => console.error(error));
            }
        });
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="w-full px-4">
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>

            {/* 4. The Table UI */}
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.displayName}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? (
                                        <span className="font-bold text-primary">Admin</span>
                                    ) : (
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn btn-ghost btn-lg bg-orange-500 text-white"
                                        >
                                            <FaUsers />
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-ghost btn-lg text-red-600"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;