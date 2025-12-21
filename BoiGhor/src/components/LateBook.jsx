import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import BookCard from './BookCard';

const LateBook = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://boi-ghor-kappa.vercel.app/books")
            .then(res => res.json())
            .then(data => {
                setBooks(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching books:", error);
                setLoading(false);
            });
    }, []);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2 // Delay between each card appearing
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section className='py-16 bg-base-100'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>

                {/* --- Section Header --- */}
                <div className='flex flex-col sm:flex-row justify-between items-end mb-10 gap-4'>
                    <div className='space-y-2'>
                        <div className='flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-wider'>
                            <Sparkles size={16} />
                            <span>Fresh Arrivals</span>
                        </div>
                        <h2 className='text-3xl md:text-4xl font-bold text-base-content'>
                            Latest Books
                        </h2>
                    </div>

                    <Link to="/all-books" className='btn btn-ghost group hover:bg-base-200'>
                        View All
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* --- Content Grid --- */}
                {loading ? (
                    // Skeleton Loader (Shows while data is fetching)
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="flex flex-col gap-4">
                                <div className="skeleton h-64 w-full rounded-xl"></div>
                                <div className="skeleton h-4 w-28"></div>
                                <div className="skeleton h-4 w-full"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Book Cards with Animation
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'
                    >
                        {/* I changed slice(2, 6) to slice(0, 4) because "Latest" usually implies 
                           the first items in the list. You can change it back if needed! 
                        */}
                        {books.slice(0, 4).map(book => (
                            <motion.div key={book._id} variants={itemVariants}>
                                <BookCard book={book} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default LateBook;