import React from 'react';
import banImg from '../assets/banner.png';

const Banner = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between bg-base-100 px-6 md:px-14 py-10 gap-8">

            {/* Left text section */}
            <div className="max-w-xl space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                    New Releases This Week
                </h1>

                <p className="text-base md:text-lg text-gray-600">
                    Discover fresh arrivals across fiction, non-fiction, academic titles, and more.
                    Browse through trending authors, top recommendations, and the most anticipated
                    books of the month. Your next favorite read starts here.
                </p>

                <button className="btn btn-primary mt-3">
                    Explore Books
                </button>
            </div>

            {/* Banner Image */}
            <div className="w-full md:w-1/2">
                <img
                    src={banImg}
                    alt="Bookstore Banner"
                    className="w-full rounded-lg shadow-md"
                />
            </div>

        </div>
    );
};

export default Banner;
