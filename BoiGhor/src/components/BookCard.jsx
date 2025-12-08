import React from "react";

const BookCard = ({ book }) => {
    const { title, author, price, image, discount } = book;

    return (
        <div className="max-w-xs bg-white border rounded-xl shadow p-5 hover:shadow-lg transition-all duration-200">

            {/* Discount Badge (shown only if discount exists) */}
            {discount && (
                <div className="absolute bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-tr-xl rounded-bl-xl">
                    {discount}% OFF
                </div>
            )}

            <img
                src={image}
                alt={title}
                className="w-full h-48 object-cover rounded-md"
            />

            <div className="mt-4">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-gray-500">by {author}</p>
                <p className="text-xl font-bold text-blue-600 mt-2">${price}</p>
            </div>

            <div className="flex gap-2 mt-4">
                <button className="btn btn-primary btn-sm w-full">Buy Now</button>

            </div>
        </div>
    );
};

export default BookCard;
