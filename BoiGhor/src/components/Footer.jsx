import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, BookOpen, Heart } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content border-t border-base-300">
            {/* --- Main Footer Content --- */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand Section */}
                    <aside className="space-y-4">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <BookOpen size={24} />
                            </div>
                            <span className="text-2xl font-bold text-base-content">BoiGhor</span>
                        </Link>
                        <p className="text-base-content/70 max-w-xs leading-relaxed">
                            Your trusted online book hub for buying, selling, and discovering your next favorite read with ease.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="btn btn-ghost btn-sm btn-circle hover:bg-primary/10 hover:text-primary transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="btn btn-ghost btn-sm btn-circle hover:bg-primary/10 hover:text-primary transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="btn btn-ghost btn-sm btn-circle hover:bg-primary/10 hover:text-primary transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="btn btn-ghost btn-sm btn-circle hover:bg-primary/10 hover:text-primary transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </aside>

                    {/* Explore Column */}
                    <nav className="flex flex-col gap-2">
                        <h6 className="footer-title text-primary opacity-100 mb-2">Explore</h6>
                        <Link to="/all-books" className="link link-hover hover:text-primary transition-colors">All Books</Link>
                        <Link to="/categories" className="link link-hover hover:text-primary transition-colors">Categories</Link>
                        <Link to="/trending" className="link link-hover hover:text-primary transition-colors">Trending</Link>
                        <Link to="/dashboard" className="link link-hover hover:text-primary transition-colors">Dashboard</Link>
                    </nav>

                    {/* Company Column */}
                    <nav className="flex flex-col gap-2">
                        <h6 className="footer-title text-primary opacity-100 mb-2">Company</h6>
                        <Link to="/about" className="link link-hover hover:text-primary transition-colors">About Us</Link>
                        <Link to="/contact" className="link link-hover hover:text-primary transition-colors">Contact</Link>
                        <Link to="/faq" className="link link-hover hover:text-primary transition-colors">FAQ</Link>
                        <Link to="/blog" className="link link-hover hover:text-primary transition-colors">Blog</Link>
                    </nav>

                    {/* Legal Column */}
                    <nav className="flex flex-col gap-2">
                        <h6 className="footer-title text-primary opacity-100 mb-2">Legal</h6>
                        <Link to="/terms" className="link link-hover hover:text-primary transition-colors">Terms of Service</Link>
                        <Link to="/privacy" className="link link-hover hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link to="/cookie" className="link link-hover hover:text-primary transition-colors">Cookie Policy</Link>
                    </nav>
                </div>
            </div>

            {/* --- Bottom Bar --- */}
            <div className="border-t border-base-300 bg-base-300/30">
                <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-base-content/60 flex items-center gap-1">
                        © {new Date().getFullYear()} BoiGhor. Made with
                        <Heart size={14} className="text-red-500 fill-red-500" />
                        in Bangladesh.
                    </p>

                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-base-content/70">Theme:</span>
                        <ThemeSwitcher />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;