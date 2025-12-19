import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hook/axiosSecure";
import Swal from "sweetalert2";

const ManageBooksUpdate = () => {
    const axiosSecure = useAxiosSecure();

    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    // Load all books
    useEffect(() => {
        const fetchBooks = async () => {
            const res = await axiosSecure.get("/books");
            setBooks(res.data);
        };
        fetchBooks();
    }, [axiosSecure]);

    // Update book
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

        const res = await axiosSecure.patch(
            `/books/${selectedBook._id}`,
            updatedBook
        );

        if (res.data.modifiedCount > 0) {
            Swal.fire({
                icon: "success",
                title: "Book updated successfully",
                timer: 1500,
                showConfirmButton: false
            });

            setBooks(prev =>
                prev.map(book =>
                    book._id === selectedBook._id
                        ? { ...book, ...updatedBook }
                        : book
                )
            );

            setSelectedBook(null);
        }
    };

    return (
        <div className="p-6 space-y-8">
            <h2 className="text-2xl font-bold">Manage Books</h2>

            {/* BOOK TABLE */}
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Old Price</th>
                        <th>New Price</th>
                        <th>Trending</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book._id}>
                            <td>{book.title}</td>
                            <td>{book.category}</td>
                            <td>${book.oldPrice}</td>
                            <td>${book.newPrice}</td>
                            <td>{book.trending ? "Yes" : "No"}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-warning"
                                    onClick={() => setSelectedBook(book)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* UPDATE FORM */}
            {selectedBook && (
                <div className="border p-4 rounded">
                    <h3 className="text-xl font-semibold mb-3">
                        Update: {selectedBook.title}
                    </h3>

                    <form onSubmit={handleUpdateBook} className="grid gap-4">
                        <input
                            name="title"
                            defaultValue={selectedBook.title}
                            className="input input-bordered"
                            required
                        />

                        <textarea
                            name="description"
                            defaultValue={selectedBook.description}
                            className="textarea textarea-bordered"
                            required
                        />

                        <select
                            name="category"
                            defaultValue={selectedBook.category}
                            className="select select-bordered"
                        >
                            <option value="business">Business</option>
                            <option value="fiction">Fiction</option>
                            <option value="science">Science</option>
                        </select>

                        <input
                            name="coverImage"
                            defaultValue={selectedBook.coverImage}
                            className="input input-bordered"
                            placeholder="Cover Image URL"
                            required
                        />

                        <input
                            type="number"
                            step="0.01"
                            name="oldPrice"
                            defaultValue={selectedBook.oldPrice}
                            className="input input-bordered"
                        />

                        <input
                            type="number"
                            step="0.01"
                            name="newPrice"
                            defaultValue={selectedBook.newPrice}
                            className="input input-bordered"
                            required
                        />

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="trending"
                                defaultChecked={selectedBook.trending}
                                className="checkbox"
                            />
                            Trending
                        </label>

                        <div className="flex gap-2">
                            <button className="btn btn-warning">
                                Update
                            </button>
                            <button
                                type="button"
                                className="btn btn-ghost"
                                onClick={() => setSelectedBook(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ManageBooksUpdate;
