import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Filter } from 'lucide-react';
import BookCard from '../../components/BookCard';

const AllBook = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when page opens
        fetch("http://localhost:3000/books")
            .then(res => res.json())
            .then(data => {
                setBooks(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // Filter books based on search (Client-side)
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='min-h-screen bg-base-100 py-12'>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* --- Page Header --- */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
                    <div>
                        <div className='flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-wider mb-2'>
                            <BookOpen size={16} />
                            <span>Library Catalog</span>
                        </div>
                        <h2 className='text-3xl md:text-4xl font-bold text-base-content'>
                            Browse Collection
                        </h2>
                        <p className="text-base-content/60 mt-2">
                            Showing {filteredBooks.length} results
                        </p>
                    </div>

                    {/* Search & Filter Toolbar */}
                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/50" />
                            <input
                                type="text"
                                placeholder="Search by title..."
                                className="input input-bordered w-full pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-outline border-base-300 hover:bg-base-200 hover:text-base-content hidden sm:flex">
                            <Filter size={18} />
                            Filter
                        </button>
                    </div>
                </div>

                {/* --- Content Grid --- */}
                {loading ? (
                    // Skeleton Loader
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                        {[...Array(8)].map((_, index) => (
                            <div key={index} className="flex flex-col gap-4">
                                <div className="skeleton h-64 w-full rounded-2xl"></div>
                                <div className="skeleton h-4 w-2/3"></div>
                                <div className="skeleton h-4 w-full"></div>
                                <div className="flex justify-between mt-2">
                                    <div className="skeleton h-8 w-20 rounded-lg"></div>
                                    <div className="skeleton h-8 w-20 rounded-lg"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredBooks.length > 0 ? (
                    // Book Grid with Animation
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'
                    >
                        {filteredBooks.map((book, index) => (
                            <motion.div
                                key={book._id || book.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <BookCard book={book} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    // Empty State
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="bg-base-200 p-6 rounded-full mb-4">
                            <Search size={48} className="text-base-content/30" />
                        </div>
                        <h3 className="text-xl font-bold text-base-content/70">No books found</h3>
                        <p className="text-base-content/50">Try adjusting your search terms.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllBook;