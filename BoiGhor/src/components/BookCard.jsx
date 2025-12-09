import React from "react";

const BookCard = ({ book }) => {
    const { title, description, coverImage, oldPrice, newPrice } = book;

    return (
        <div className="max-w-xs bg-white border rounded-xl shadow p-5 hover:shadow-lg transition duration-200">

            <img
                src={`/${coverImage}`}
                alt={title}
                className="w-full h-48 object-cover rounded-md"
            />

            <h3 className="text-lg font-semibold mt-4">{title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{description}</p>

            <div className="mt-3">
                <p className="text-gray-400 line-through text-sm">${oldPrice}</p>
                <p className="text-xl font-bold text-blue-600">${newPrice}</p>
            </div>

            <button className="btn btn-primary btn-sm w-full mt-4">
                Buy Now
            </button>
        </div>
    );
};

export default BookCard;
