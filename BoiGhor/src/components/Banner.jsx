import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Sparkles, Star, TrendingUp } from 'lucide-react';

const Banner = () => {
    return (
        <section className="relative overflow-hidden bg-base-100 py-12 md:py-20 lg:py-24">
            {/* Background Pattern Effects */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/20 rounded-full blur-[100px]" />
            </div>

            <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* --- Left Content --- */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-center lg:text-left z-10"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                        >
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-sm font-semibold text-primary">New Releases This Week</span>
                        </motion.div>

                        {/* Heading */}
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-base-content leading-tight mb-6">
                            Discover Your Next <br className="hidden lg:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                Favorite Book
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-base-content/70 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                            Discover fresh arrivals across fiction, non-fiction, and academic titles.
                            Browse through trending authors and the most anticipated books of the month.
                        </p>

                        {/* CTA Buttons (Using DaisyUI classes) */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link to="/all-books" className="btn btn-primary btn-lg shadow-lg hover:shadow-primary/50 transition-all duration-300 group">
                                Explore Books
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/categories" className="btn btn-outline btn-lg hover:bg-base-200 transition-all duration-300">
                                Categories
                            </Link>
                        </div>

                        {/* Stats Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center justify-center lg:justify-start gap-8 mt-10 pt-8 border-t border-base-300"
                        >
                            <div className="text-center lg:text-left">
                                <p className="text-3xl font-bold text-base-content">50K+</p>
                                <p className="text-sm text-base-content/60">Books Available</p>
                            </div>
                            <div className="h-10 w-px bg-base-300" />
                            <div className="text-center lg:text-left">
                                <p className="text-3xl font-bold text-base-content">4.9</p>
                                <div className="flex items-center gap-1 justify-center lg:justify-start text-sm text-base-content/60">
                                    <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                                    <span>Rating</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* --- Right Content - Animated Book Showcase --- */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative hidden lg:block h-[600px] w-full"
                    >
                        {/* Background Blob for images */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl" />

                        <div className="relative w-full h-full flex items-center justify-center perspective-1000">

                            {/* Floating Book 1 (Left Back) */}
                            <motion.div
                                animate={{ y: [0, -20, 0], rotate: -12 }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute left-10 top-20 w-48 shadow-2xl rounded-lg overflow-hidden z-10"
                            >
                                <img src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&fit=crop" alt="Book 1" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
                            </motion.div>

                            {/* Floating Book 2 (Right Back) */}
                            <motion.div
                                animate={{ y: [0, 25, 0], rotate: 12 }}
                                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute right-10 top-32 w-44 shadow-2xl rounded-lg overflow-hidden z-10"
                            >
                                <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&fit=crop" alt="Book 2" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
                            </motion.div>

                            {/* Main Center Book */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="relative z-20 w-64 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-xl overflow-hidden border-4 border-base-100"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&fit=crop"
                                    alt="Main Featured Book"
                                    className="w-full h-auto object-cover"
                                />
                                {/* Floating Label on Main Book */}
                                <div className="absolute bottom-4 left-4 right-4 bg-base-100/90 backdrop-blur-md p-3 rounded-lg shadow-lg flex items-center gap-3">
                                    <div className="p-2 bg-primary/20 rounded-full text-primary">
                                        <TrendingUp size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-primary uppercase">Trending</p>
                                        <p className="text-sm font-semibold text-base-content truncate">The Art of Design</p>
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Banner;