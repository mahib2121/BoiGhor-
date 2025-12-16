import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/features/cart/cartSlice';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/books/${id}`);
                setBook(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to load book data", error);
                setLoading(false);
            }
        };

        if (id) {
            fetchBookData();
        }
    }, [id]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Added to Cart Successfully",
            showConfirmButton: false,
            timer: 1500
        });
    };

    if (loading) return <div className="text-center p-10">Loading...</div>;
    if (!book) return <div className="text-center p-10">Book not found.</div>;
    const { title, description, category, trending, coverImage, oldPrice, newPrice } = book;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
            <div className="flex flex-col md:flex-row gap-8">

                <div className="w-full md:w-1/3 flex justify-center items-start relative">
                    <img
                        src={coverImage}
                        alt={title}
                        className="rounded-lg shadow-md w-full object-cover max-h-[400px]"
                    />
                    {trending && (
                        <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            Trending
                        </span>
                    )}
                </div>

                <div className="w-full md:w-2/3 flex flex-col justify-between">
                    <div>
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full uppercase tracking-wide">
                            {category}
                        </span>

                        <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
                            {title}
                        </h1>

                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            {description}
                        </p>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-bold text-gray-900">
                                ${newPrice}
                            </span>
                            <span className="text-xl text-gray-400 line-through">
                                ${oldPrice}
                            </span>
                            <span className="text-green-600 text-sm font-semibold">
                                {Math.round(((oldPrice - newPrice) / oldPrice) * 100)}% OFF
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-4">
                        {/* <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                            Buy Now
                        </button> */}
                        <button
                            onClick={() => handleAddToCart(book)}
                            className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold py-3 px-6 rounded-lg transition duration-300"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;