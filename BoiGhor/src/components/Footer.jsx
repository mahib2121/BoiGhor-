import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content">
            {/* Top section */}
            <div className="footer p-10 sm:footer-horizontal">
                {/* Brand */}
                <aside>
                    <h2 className="text-2xl font-bold text-primary">BoiGhor</h2>
                    <p className="mt-2 max-w-xs">
                        Your trusted online book hub for buying, selling, and
                        discovering books with ease.
                    </p>
                </aside>

                {/* Explore */}
                <nav>
                    <h6 className="footer-title">Explore</h6>
                    <Link to="/all-books" className="link link-hover">All Books</Link>
                    <Link to="/categories" className="link link-hover">Categories</Link>
                    <Link to="/trending" className="link link-hover">Trending</Link>
                    <Link to="/dashboard" className="link link-hover">Dashboard</Link>
                </nav>

                {/* Company */}
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <Link to="/about" className="link link-hover">About Us</Link>
                    <Link to="/contact" className="link link-hover">Contact</Link>
                    <Link to="/faq" className="link link-hover">FAQ</Link>
                </nav>

                {/* Legal */}
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <Link to="/terms" className="link link-hover">Terms & Conditions</Link>
                    <Link to="/privacy" className="link link-hover">Privacy Policy</Link>
                </nav>
            </div>

            {/* Bottom section */}
            <div className="footer border-t border-base-300 px-10 py-4">
                <aside className="items-center grid-flow-col">
                    <p>
                        © {new Date().getFullYear()} BoiGhor. All rights reserved.
                    </p>
                </aside>

                {/* Social icons */}
                <nav className="md:place-self-center md:justify-self-end">
                    <div className="grid grid-flow-col gap-4">
                        <a aria-label="Facebook">
                            <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M9 8H6v4h3v12h5V12h3.6l.4-4H14V6.5c0-1 .2-1.5 1.3-1.5H18V0h-3.6C10.8 0 9 1.7 9 4.9V8z" />
                            </svg>
                        </a>
                        <a aria-label="Twitter">
                            <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M24 4.6a9.9 9.9 0 0 1-2.8.8A4.9 4.9 0 0 0 23.3 3a9.8 9.8 0 0 1-3.1 1.2A4.9 4.9 0 0 0 16.6 2c-2.7 0-4.9 2.2-4.9 4.9 0 .4 0 .8.1 1.1C7.7 7.8 4.1 5.9 1.7 3a4.9 4.9 0 0 0-.7 2.5c0 1.7.9 3.3 2.3 4.2a4.8 4.8 0 0 1-2.2-.6v.1c0 2.4 1.7 4.4 4 4.9a5 5 0 0 1-2.2.1c.6 2 2.5 3.5 4.7 3.5A9.9 9.9 0 0 1 0 19.5 14 14 0 0 0 7.5 22c9 0 13.9-7.4 13.9-13.9v-.6A9.8 9.8 0 0 0 24 4.6z" />
                            </svg>
                        </a>
                    </div>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
