// import React from 'react';
// import useAxiosSecure from '../../hook/axiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import Swal from 'sweetalert2';
// import { FaTrashAlt, FaUsers } from 'react-icons/fa';

// const UserManagement = () => {
//     const axiosSecure = useAxiosSecure();
//     const { data: users = [], refetch, isLoading } = useQuery({
//         queryKey: ['users'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/users');
//             return res.data;
//         }
//     });
//     const handleMakeAdmin = (user) => {
//         axiosSecure.patch(`/users/admin/${user._id}`)
//             .then(res => {
//                 if (res.data.modifiedCount > 0) {
//                     refetch();
//                     Swal.fire({
//                         position: "top-end",
//                         icon: "success",
//                         title: `${user.
//                             displayName} is an Admin Now!`,
//                         showConfirmButton: false,
//                         timer: 1500
//                     });
//                 }
//             })
//             .catch(error => console.error(error));
//     };
//     const handleDeleteUser = (user) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure.delete(`/users/${user._id}`)
//                     .then(res => {
//                         if (res.data.deletedCount > 0) {
//                             refetch();
//                             Swal.fire("Deleted!", "User has been deleted.", "success");
//                         }
//                     })
//                     .catch(error => console.error(error));
//             }
//         });
//     };

//     if (isLoading) return <div>Loading...</div>;

//     return (
//         <div className="w-full px-4">
//             <div className="flex justify-evenly my-4">
//                 <h2 className="text-3xl">All Users</h2>
//                 <h2 className="text-3xl">Total Users: {users.length}</h2>
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra w-full">
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Role</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user, index) => (
//                             <tr key={user._id}>
//                                 <th>{index + 1}</th>
//                                 <td>{user.displayName}</td>
//                                 <td>{user.email}</td>
//                                 <td>
//                                     {user.role === 'admin' ? (
//                                         <span className="font-bold text-primary">Admin</span>
//                                     ) : (
//                                         <button
//                                             onClick={() => handleMakeAdmin(user)}
//                                             className="btn btn-ghost btn-lg bg-orange-500 text-white"
//                                         >
//                                             <FaUsers />
//                                         </button>
//                                     )}
//                                 </td>
//                                 <td>
//                                     <button
//                                         onClick={() => handleDeleteUser(user)}
//                                         className="btn btn-ghost btn-lg text-red-600"
//                                     >
//                                         <FaTrashAlt />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default UserManagement;



import React from "react";
import useAxiosSecure from "../../hook/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";

const UserManagement = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: users = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    const handleRoleChange = async (user, role) => {
        try {
            const res = await axiosSecure.patch(
                `/users/role/${user._id}`,
                { role }
            );

            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.displayName} is now ${role}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire("Deleted!", "User has been deleted.", "success");
                    }
                });
            }
        });
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="w-full px-4">
            <div className="flex justify-between my-4">
                <h2 className="text-3xl font-semibold">User Management</h2>
                <h2 className="text-xl">Total Users: {users.length}</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Change Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.displayName}</td>
                                <td>{user.email}</td>

                                <td className="font-semibold capitalize">
                                    {user.role || "user"}
                                </td>

                                <td>
                                    <select
                                        className="select select-bordered select-sm"
                                        value={user.role || "user"}
                                        onChange={(e) =>
                                            handleRoleChange(user, e.target.value)
                                        }
                                    >
                                        <option value="user">User</option>
                                        <option value="librarian">Librarian</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>

                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-ghost btn-sm text-red-600"
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
