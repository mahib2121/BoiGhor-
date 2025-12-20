import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
    Edit,
    Trash2,
    Search,
    BookOpen,
    MoreHorizontal,
    TrendingUp,
    X,
    Save
} from "lucide-react";
import useAxiosSecure from "../../hook/axiosSecure";

const ManageBooksUpdate = () => {
    const axiosSecure = useAxiosSecure();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingBook, setEditingBook] = useState(null);

    // Fetch Books
    const fetchBooks = async () => {
        try {
            const res = await axiosSecure.get("/books");
            setBooks(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [axiosSecure]);

    // Handle Delete
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/books/${id}`);
                    if (res.data.deletedCount > 0) {
                        Swal.fire("Deleted!", "Book has been deleted.", "success");
                        fetchBooks();
                    }
                } catch (error) {
                    Swal.fire("Error", "Failed to delete book.", "error");
                }
            }
        });
    };

    // Handle Update (Submit Form)
    const handleUpdateBook = async (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedBook = {
            title: form.title.value,
            description: form.description.value,
            category: form.category.value,
            coverImage: form.coverImage.value,
            oldPrice: Number(form.oldPrice.value),
            newPrice: Number(form.newPrice.value),
            trending: form.trending.checked
        };

        try {
            const res = await axiosSecure.patch(`/books/${editingBook._id}`, updatedBook);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: `${updatedBook.title} updated successfully`,
                    timer: 1500,
                    showConfirmButton: false
                });
                fetchBooks();
                setEditingBook(null); // Close Modal
                document.getElementById('edit_modal').close();
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to update book.", "error");
        }
    };

    // Open Modal
    const openEditModal = (book) => {
        setEditingBook(book);
        document.getElementById('edit_modal').showModal();
    };

    // Filter Logic
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-10 text-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

    return (
        <div className="p-6">

            {/* --- Header & Search --- */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <BookOpen className="text-primary" /> Manage Books
                    </h2>
                    <p className="text-sm text-gray-500">Total Books: {books.length}</p>
                </div>
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search books..."
                        className="input input-bordered w-full pl-10 h-10"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* --- Table --- */}
            <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table table-md w-full">
                        <thead className="bg-base-200/50">
                            <tr>
                                <th>#</th>
                                <th>Book Details</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBooks.map((book, index) => (
                                <tr key={book._id} className="hover:bg-base-200/30">
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-16 bg-base-300">
                                                    <img src={book.coverImage} alt={book.title} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm">{book.title}</div>
                                                <div className="text-xs opacity-50 max-w-[150px] truncate">{book.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="badge badge-ghost font-medium capitalize">
                                            {book.category}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-primary">${book.newPrice}</span>
                                            {book.oldPrice > book.newPrice && (
                                                <span className="text-xs line-through opacity-50">${book.oldPrice}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        {book.trending && (
                                            <div className="badge badge-secondary badge-outline gap-1 text-xs">
                                                <TrendingUp size={10} /> Trending
                                            </div>
                                        )}
                                    </td>
                                    <td className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => openEditModal(book)}
                                                className="btn btn-sm btn-square btn-ghost text-info hover:bg-info/10"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(book._id)}
                                                className="btn btn-sm btn-square btn-ghost text-error hover:bg-error/10"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- Edit Modal (DaisyUI Dialog) --- */}
            <dialog id="edit_modal" className="modal">
                <div className="modal-box w-11/12 max-w-2xl">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setEditingBook(null)}>✕</button>
                    </form>

                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                        <Edit size={20} /> Update Book Details
                    </h3>

                    {editingBook && (
                        <form onSubmit={handleUpdateBook} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div className="form-control md:col-span-2">
                                <label className="label"><span className="label-text">Title</span></label>
                                <input name="title" defaultValue={editingBook.title} className="input input-bordered" required />
                            </div>

                            <div className="form-control md:col-span-2">
                                <label className="label"><span className="label-text">Description</span></label>
                                <textarea name="description" defaultValue={editingBook.description} className="textarea textarea-bordered h-24" required></textarea>
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text">Category</span></label>
                                <select name="category" defaultValue={editingBook.category} className="select select-bordered">
                                    <option value="business">Business</option>
                                    <option value="fiction">Fiction</option>
                                    <option value="science">Science</option>
                                    <option value="history">History</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text">Cover Image URL</span></label>
                                <input name="coverImage" defaultValue={editingBook.coverImage} className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text">Old Price</span></label>
                                <input type="number" step="0.01" name="oldPrice" defaultValue={editingBook.oldPrice} className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text">New Price</span></label>
                                <input type="number" step="0.01" name="newPrice" defaultValue={editingBook.newPrice} className="input input-bordered" required />
                            </div>

                            <div className="form-control md:col-span-2">
                                <label className="cursor-pointer label justify-start gap-4 p-0 mt-2">
                                    <input type="checkbox" name="trending" defaultChecked={editingBook.trending} className="checkbox checkbox-primary" />
                                    <span className="label-text font-medium">Mark as Trending</span>
                                </label>
                            </div>

                            <div className="md:col-span-2 modal-action mt-6">
                                <button type="submit" className="btn btn-primary w-full">
                                    <Save size={18} /> Save Changes
                                </button>
                            </div>
                        </form>
                    )}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => setEditingBook(null)}>close</button>
                </form>
            </dialog>

        </div>
    );
};

export default ManageBooksUpdate;