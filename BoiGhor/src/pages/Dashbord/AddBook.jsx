import React from "react";
import useAxiosSecure from "../../hook/axiosSecure";
import Swal from "sweetalert2";

const AddBook = () => {
    const axiosSecure = useAxiosSecure();

    const handleAddBook = async (e) => {
        e.preventDefault();
        const form = e.target;

        const bookData = {
            title: form.title.value,
            description: form.description.value,
            category: form.category.value,
            coverImage: form.coverImage.value,
            oldPrice: Number(form.oldPrice.value),
            newPrice: Number(form.newPrice.value),
            trending: form.trending.checked
        };

        try {
            const res = await axiosSecure.post("/books", bookData);

            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: `${bookData.title} added successfully`,
                    timer: 1500,
                    showConfirmButton: false
                });
                form.reset();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Add New Book</h2>

            <form onSubmit={handleAddBook} className="grid gap-4">

                {/* Title */}
                <input
                    type="text"
                    name="title"
                    placeholder="Book Title"
                    className="input input-bordered w-full"
                    required
                />

                {/* Description */}
                <textarea
                    name="description"
                    placeholder="Book Description"
                    className="textarea textarea-bordered h-24"
                    required
                />

                {/* Category */}
                <select
                    name="category"
                    className="select select-bordered w-full"
                    defaultValue=""
                    required
                >
                    <option value="" disabled>Select Category</option>
                    <option value="business">Business</option>
                    <option value="fiction">Fiction</option>
                    <option value="science">Science</option>
                </select>

                {/* Cover Image */}
                <input
                    type="text"
                    name="coverImage"
                    placeholder="Cover Image URL"
                    className="input input-bordered w-full"
                    required
                />

                {/* Prices */}
                <div className="flex gap-4">
                    <input
                        type="number"
                        step="0.01"
                        name="oldPrice"
                        placeholder="Old Price"
                        className="input input-bordered w-full"
                    />

                    <input
                        type="number"
                        step="0.01"
                        name="newPrice"
                        placeholder="New Price"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Trending */}
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="trending"
                        className="checkbox"
                    />
                    Trending
                </label>

                <button className="btn btn-primary mt-2">
                    Add Book
                </button>
            </form>
        </div>
    );
};

export default AddBook;
