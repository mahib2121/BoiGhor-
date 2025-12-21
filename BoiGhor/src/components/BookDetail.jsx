import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { ShoppingCart, ArrowLeft, Share2, Heart, Star, BookOpen } from 'lucide-react';
import { addToCart } from '../redux/features/cart/cartSlice';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0); // Ensure page starts at top
        const fetchBookData = async () => {
            try {
                const response = await axios.get(`https://boi-ghor-kappa.vercel.app/books/${id}`);
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
            title: "Added to Cart!",
            text: `${product.title} has been added to your shopping bag.`,
            showConfirmButton: false,
            timer: 1500,
            background: '#fff',
            customClass: { popup: 'rounded-xl' }
        });
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-base-100">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    if (!book) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 gap-4">
            <h2 className="text-2xl font-bold">Book not found</h2>
            <Link to="/all-books" className="btn btn-primary">Back to Store</Link>
        </div>
    );

    const { title, description, category, trending, coverImage, oldPrice, newPrice } = book;

    // Calculate discount
    const discount = oldPrice ? Math.round(((oldPrice - newPrice) / oldPrice) * 100) : 0;

    return (
        <div className="min-h-screen bg-base-200/30 py-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* --- Breadcrumb Navigation --- */}
                <div className="text-sm breadcrumbs mb-6 text-base-content/70">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/all-books">Books</Link></li>
                        <li className="font-semibold text-primary overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">{title}</li>
                    </ul>
                </div>

                {/* --- Main Content Card --- */}
                <div className="card lg:card-side bg-base-100 shadow-xl overflow-hidden">

                    {/* Left: Image Section */}
                    <figure className="relative lg:w-1/3 bg-base-200/50 p-8 flex justify-center items-center">
                        <div className="relative shadow-2xl rounded-lg overflow-hidden max-w-sm w-full transform hover:scale-[1.02] transition-transform duration-300">
                            <img
                                src={coverImage}
                                alt={title}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Trending Badge */}
                        {trending && (
                            <div className="absolute top-6 left-6 badge badge-secondary badge-lg shadow-lg gap-2">
                                <Star size={14} fill="currentColor" /> Trending
                            </div>
                        )}
                    </figure>

                    {/* Right: Details Section */}
                    <div className="card-body lg:w-2/3 p-6 md:p-10">

                        {/* Category & Actions */}
                        <div className="flex justify-between items-start">
                            <span className="badge badge-outline badge-primary font-medium px-4 py-3 uppercase tracking-wider">
                                {category}
                            </span>
                            <div className="flex gap-2">
                                <button className="btn btn-circle btn-ghost btn-sm hover:text-red-500 tooltip tooltip-bottom" data-tip="Add to Wishlist">
                                    <Heart size={20} />
                                </button>
                                <button className="btn btn-circle btn-ghost btn-sm hover:text-blue-500 tooltip tooltip-bottom" data-tip="Share">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Title & Description */}
                        <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-2 text-base-content leading-tight">
                            {title}
                        </h1>

                        {/* Mock Rating */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="rating rating-sm">
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked readOnly />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            </div>
                            <span className="text-sm text-base-content/60">(128 reviews)</span>
                        </div>

                        <p className="text-base-content/70 text-lg leading-relaxed mb-8 border-b border-base-200 pb-8">
                            {description}
                        </p>

                        {/* Price & Cart Actions */}
                        <div className="flex flex-col sm:flex-row gap-6 items-end sm:items-center justify-between mt-auto">

                            <div className="flex items-end gap-3">
                                <span className="text-4xl font-bold text-primary">${newPrice}</span>
                                {oldPrice > newPrice && (
                                    <>
                                        <span className="text-xl text-base-content/40 line-through mb-1">${oldPrice}</span>
                                        <span className="badge badge-success text-white font-bold mb-2">
                                            {discount}% OFF
                                        </span>
                                    </>
                                )}
                            </div>

                            <div className="flex gap-4 w-full sm:w-auto">
                                <Link to="/all-books" className="btn btn-outline border-base-300 w-1/3 sm:w-auto">
                                    <ArrowLeft size={20} />
                                    <span className="hidden sm:inline">Back</span>
                                </Link>
                                <button
                                    onClick={() => handleAddToCart(book)}
                                    className="btn btn-primary flex-1 sm:w-auto px-8 shadow-lg hover:shadow-primary/50 transition-all"
                                >
                                    <ShoppingCart size={20} />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;