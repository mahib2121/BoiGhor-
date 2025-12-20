import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingCart, Eye, Sparkles } from "lucide-react";
import Swal from "sweetalert2";
import { addToCart } from "../redux/features/cart/cartSlice";

const BookCard = ({ book }) => {
    const { title, description, coverImage, oldPrice, newPrice, category } = book;
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Added to Cart!",
            text: `${product.title} is now in your cart`,
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'rounded-2xl'
            }
        });
    };

    // Calculate discount percentage
    const discount = oldPrice ? Math.round(((oldPrice - newPrice) / oldPrice) * 100) : 0;

    return (
        <div className="card bg-base-100 w-full shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-200 group overflow-hidden">

            {/* --- Image Section --- */}
            <figure className="relative h-64 overflow-hidden bg-base-200">
                <img
                    src={coverImage}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Discount Badge */}
                {discount > 0 && (
                    <div className="absolute top-3 right-3 badge badge-error text-white font-bold shadow-md">
                        -{discount}% OFF
                    </div>
                )}

                {/* Quick Action Overlay (Visible on Hover) */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                    <Link to={`/books/${book._id}`}>
                        <button className="btn btn-circle btn-sm bg-white text-black border-none hover:bg-primary hover:text-white transition-colors" title="View Details">
                            <Eye size={18} />
                        </button>
                    </Link>
                    <button
                        onClick={() => handleAddToCart(book)}
                        className="btn btn-circle btn-sm bg-white text-black border-none hover:bg-primary hover:text-white transition-colors"
                        title="Add to Cart"
                    >
                        <ShoppingCart size={18} />
                    </button>
                </div>
            </figure>

            {/* --- Content Section --- */}
            <div className="card-body p-5">
                {/* Category & Rating (Optional placeholder) */}
                <div className="flex justify-between items-center text-xs text-base-content/60 mb-2">
                    <span className="uppercase tracking-wider font-medium">{category || "Fiction"}</span>
                    <div className="flex items-center gap-1 text-orange-400">
                        <Sparkles size={12} fill="currentColor" />
                        <span>4.8</span>
                    </div>
                </div>

                <Link to={`/books/${book._id}`} className="hover:text-primary transition-colors">
                    <h3 className="card-title text-lg font-bold line-clamp-1 leading-tight" title={title}>
                        {title}
                    </h3>
                </Link>

                <p className="text-sm text-base-content/70 line-clamp-2 min-h-[40px]">
                    {description.length > 80 ? description.slice(0, 80) + "..." : description}
                </p>

                {/* Price & Actions */}
                <div className="card-actions justify-between items-center mt-4 pt-4 border-t border-base-200">
                    <div>
                        {oldPrice > newPrice && (
                            <p className="text-xs text-base-content/50 line-through font-medium">
                                ${oldPrice}
                            </p>
                        )}
                        <p className="text-xl font-bold text-primary">
                            ${newPrice}
                        </p>
                    </div>

                    <button
                        onClick={() => handleAddToCart(book)}
                        className="btn btn-primary btn-sm px-4 shadow-md hover:shadow-lg transition-all"
                    >
                        <ShoppingCart size={16} className="mr-1" />
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;