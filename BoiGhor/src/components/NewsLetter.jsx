import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Sparkles } from 'lucide-react';

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            // You can replace this with your toast library (e.g., react-toastify)
            alert('Successfully subscribed to our newsletter!');
            setEmail('');
        }
    };

    return (
        <section className="py-16 md:py-24 bg-base-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary p-8 md:p-12 lg:p-16 shadow-2xl"
                >
                    {/* Background Pattern Effects */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
                    </div>

                    <div className="relative z-10 max-w-2xl mx-auto text-center">

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 backdrop-blur-md mb-6"
                        >
                            <Sparkles className="h-4 w-4 text-white" />
                            <span className="text-sm font-semibold text-white">Stay Updated</span>
                        </motion.div>

                        {/* Heading */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                            Join Our Book Club
                        </h2>
                        <p className="text-lg text-white/90 mb-8 max-w-lg mx-auto">
                            Get exclusive access to new releases, reading recommendations, and special offers delivered to your inbox.
                        </p>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <div className="relative flex-1">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input w-full h-12 pl-12 bg-white text-gray-900 border-none focus:ring-2 focus:ring-white/50 placeholder:text-gray-400"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn h-12 px-8 bg-gray-900 hover:bg-gray-800 text-white border-none shadow-lg group"
                            >
                                Subscribe
                                <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

                        <p className="text-sm text-white/70 mt-6">
                            No spam, unsubscribe at any time.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;