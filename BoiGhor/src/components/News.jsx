import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';

// CSS Imports
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Image Imports
import news1 from '../assets/news/news-1.png';
import news2 from '../assets/news/news-2.png';
import news3 from '../assets/news/news-3.png';
import news4 from '../assets/news/news-4.png';

const news = [
    {
        id: 1,
        title: "Global Climate Summit Calls for Urgent Action",
        description: "World leaders gather at the Global Climate Summit to discuss strategies to combat climate change and reduce carbon emissions.",
        image: news1,
        date: "Dec 14, 2025"
    },
    {
        id: 2,
        title: "Breakthrough in AI Technology Announced",
        description: "A major breakthrough in artificial intelligence has been announced, promising to revolutionize industries from healthcare to finance.",
        image: news2,
        date: "Dec 12, 2025"
    },
    {
        id: 3,
        title: "New Space Mission Aims to Explore Galaxies",
        description: "NASA has unveiled plans for a new space mission that will aim to explore distant galaxies and uncover origins of the universe.",
        image: news3,
        date: "Dec 10, 2025"
    },
    {
        id: 4,
        title: "Stock Markets Reach Record Highs",
        description: "Global stock markets have reached record highs as signs of economic recovery continue to emerge following the global pandemic.",
        image: news4,
        date: "Dec 08, 2025"
    },
    {
        id: 5,
        title: "Innovative Smartphone Released",
        description: "A leading tech company has released its latest smartphone model, featuring cutting-edge technology and improved battery life.",
        image: news2,
        date: "Dec 05, 2025"
    }
];

const News = () => {
    return (
        <section className="py-16 bg-base-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* --- Header Section --- */}
                <div className='flex flex-col sm:flex-row justify-between items-end mb-10 gap-4'>
                    <div className='space-y-2'>
                        <div className='flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-wider'>
                            <Newspaper size={16} />
                            <span>Journal & Articles</span>
                        </div>
                        <h2 className='text-3xl md:text-4xl font-bold text-base-content'>
                            Latest News
                        </h2>
                    </div>

                    <Link to="/news" className='btn btn-ghost group hover:bg-base-200'>
                        View All News
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* --- Swiper Section --- */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={24}
                        pagination={{ clickable: true }}
                        navigation={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: { slidesPerView: 1, spaceBetween: 20 },
                            768: { slidesPerView: 2, spaceBetween: 24 },
                            1024: { slidesPerView: 3, spaceBetween: 30 },
                        }}
                        modules={[Pagination, Navigation, Autoplay]}
                        className="mySwiper !pb-12" // Padding bottom for pagination dots
                    >
                        {news.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 h-full group">
                                    <figure className="relative h-56 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Date Badge overlay */}
                                        <div className="absolute top-4 right-4 bg-base-100/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1">
                                            <Calendar size={12} className="text-primary" />
                                            {item.date}
                                        </div>
                                    </figure>

                                    <div className="card-body p-6">
                                        <Link to={`/news/${item.id}`} className="card-title text-xl font-bold hover:text-primary transition-colors line-clamp-2">
                                            {item.title}
                                        </Link>
                                        <p className="text-base-content/70 text-sm mt-2 line-clamp-3 leading-relaxed">
                                            {item.description}
                                        </p>

                                        <div className="card-actions justify-end mt-4">
                                            <Link
                                                to={`/news/${item.id}`}
                                                className="btn btn-link btn-sm text-primary no-underline hover:no-underline px-0 group-hover:gap-2 transition-all"
                                            >
                                                Read More <ArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
            </div>
        </section>
    );
};

export default News;