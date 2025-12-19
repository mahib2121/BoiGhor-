import React from 'react';
import { useLoaderData } from 'react-router';
import useAxiosSecure from '../../hook/axiosSecure';
import Swal from 'sweetalert2';

const UpdateBook = () => {
    const book = useLoaderData(); // Data loaded from router
    const axiosSecure = useAxiosSecure();

    const handleUpdateBook = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const author = form.author.value;
        const price = form.price.value;
        const category = form.category.value;
        const imageURL = form.imageURL.value;
        const description = form.description.value;

        const updatedBookData = { title, author, price, category, imageURL, description };

        const res = await axiosSecure.patch(`/books/${book._id}`, updatedBookData);
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${title} updated successfully`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div className="w-full p-4">
            <h2 className="text-3xl font-bold mb-4">Update Book: {book.title}</h2>
            <form onSubmit={handleUpdateBook} className="grid grid-cols-1 gap-4">
                <div className="flex gap-4">
                    <input type="text" name="title" defaultValue={book.title} className="input input-bordered w-full" />
                    <input type="text" name="author" defaultValue={book.author} className="input input-bordered w-full" />
                </div>
                <div className="flex gap-4">
                    <input type="number" name="price" defaultValue={book.price} className="input input-bordered w-full" />
                    <select name="category" defaultValue={book.category} className="select select-bordered w-full">
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                    </select>
                </div>
                <input type="text" name="imageURL" defaultValue={book.imageURL} className="input input-bordered w-full" />
                <textarea name="description" defaultValue={book.description} className="textarea textarea-bordered h-24"></textarea>

                <button className="btn btn-warning mt-4">Update Book</button>
            </form>
        </div>
    );
};

export default UpdateBook;