import React, { useState } from "react";
import Swal from "sweetalert2";
import {
    BookOpen,
    AlignLeft,
    Image as ImageIcon,
    DollarSign,
    Tag,
    PlusCircle,
    CheckCircle
} from "lucide-react";
import useAxiosSecure from "../../hook/axiosSecure";

const AddBook = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState("");

    const handleAddBook = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;

        const bookData = {
            title: form.title.value,
            description: form.description.value,
            category: form.category.value,
            coverImage: form.coverImage.value,
            oldPrice: Number(form.oldPrice.value) || 0,
            newPrice: Number(form.newPrice.value),
            trending: form.trending.checked,
            createdAt: new Date()
        };

        try {
            const res = await axiosSecure.post("/books", bookData);

            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: `${bookData.title} has been added to your library.`,
                    showConfirmButton: false,
                    timer: 2000
                });
                form.reset();
                setImagePreview("");
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">

            {/* --- Header --- */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <PlusCircle size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-base-content">Add New Book</h2>
                    <p className="text-sm text-base-content/60">Fill in the details to add a new book to the inventory.</p>
                </div>
            </div>

            {/* --- Form Card --- */}
            <div className="card bg-base-100 shadow-xl border border-base-200">
                <div className="card-body">
                    <form onSubmit={handleAddBook} className="space-y-6">

                        {/* Title */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium flex items-center gap-2">
                                    <BookOpen size={16} /> Book Title <span className="text-error">*</span>
                                </span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="e.g. The Great Gatsby"
                                className="input input-bordered w-full focus:input-primary"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium flex items-center gap-2">
                                    <AlignLeft size={16} /> Description <span className="text-error">*</span>
                                </span>
                            </label>
                            <textarea
                                name="description"
                                placeholder="Write a short summary of the book..."
                                className="textarea textarea-bordered h-32 focus:textarea-primary leading-relaxed"
                                required
                            ></textarea>
                        </div>

                        {/* Category & Image URL */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium flex items-center gap-2">
                                        <Tag size={16} /> Category <span className="text-error">*</span>
                                    </span>
                                </label>
                                <select name="category" className="select select-bordered w-full focus:select-primary" defaultValue="" required>
                                    <option value="" disabled>Select a category</option>
                                    <option value="business">Business</option>
                                    <option value="fiction">Fiction</option>
                                    <option value="science">Science</option>
                                    <option value="history">History</option>
                                    <option value="technology">Technology</option>
                                    <option value="biography">Biography</option>
                                </select>
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium flex items-center gap-2">
                                        <ImageIcon size={16} /> Cover Image URL <span className="text-error">*</span>
                                    </span>
                                </label>
                                <input
                                    type="url"
                                    name="coverImage"
                                    placeholder="https://example.com/image.jpg"
                                    className="input input-bordered w-full focus:input-primary"
                                    onChange={(e) => setImagePreview(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Image Preview (Optional) */}
                        {imagePreview && (
                            <div className="w-full flex justify-center py-4 bg-base-200/50 rounded-lg border border-dashed border-base-300">
                                <div className="text-center">
                                    <span className="text-xs text-base-content/50 mb-2 block">Image Preview</span>
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="h-40 object-contain rounded shadow-sm mx-auto"
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Pricing */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium flex items-center gap-2">
                                        <DollarSign size={16} /> Regular Price
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="oldPrice"
                                    placeholder="0.00"
                                    className="input input-bordered w-full focus:input-primary"
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium flex items-center gap-2">
                                        <DollarSign size={16} /> Sale Price <span className="text-error">*</span>
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="newPrice"
                                    placeholder="0.00"
                                    className="input input-bordered w-full focus:input-primary"
                                    required
                                />
                            </div>
                        </div>

                        {/* Trending Checkbox */}
                        <div className="form-control w-fit">
                            <label className="cursor-pointer label justify-start gap-3">
                                <input type="checkbox" name="trending" className="checkbox checkbox-primary" />
                                <span className="label-text font-medium">Mark as Trending Book</span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full btn-lg shadow-lg hover:shadow-primary/40 mt-6"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-md"></span>
                            ) : (
                                <>
                                    <CheckCircle size={20} /> Add Book to Inventory
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBook;