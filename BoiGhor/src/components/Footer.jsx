import React from "react";
import { Link } from "react-router";
import ThemeSwitcher from "./ThemeSwitcher";

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content">
            <div className="footer p-10 sm:footer-horizontal">
                <aside>
                    <h2 className="text-2xl font-bold text-primary">BoiGhor</h2>
                    <p className="mt-2 max-w-xs">
                        Your trusted online book hub for buying, selling, and
                        discovering books with ease.
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Explore</h6>
                    <Link to="/all-books" className="link link-hover">All Books</Link>
                    <Link to="/categories" className="link link-hover">Categories</Link>
                    <Link to="/trending" className="link link-hover">Trending</Link>
                    <Link to="/dashboard" className="link link-hover">Dashboard</Link>
                </nav>


                <nav>
                    <h6 className="footer-title">Company</h6>
                    <Link to="/about" className="link link-hover">About Us</Link>
                    <Link to="/contact" className="link link-hover">Contact</Link>
                    <Link to="/faq" className="link link-hover">FAQ</Link>
                </nav>


                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <Link to="/terms" className="link link-hover">Terms & Conditions</Link>
                    <Link to="/privacy" className="link link-hover">Privacy Policy</Link>
                </nav>
            </div>


            <div className="footer border-t border-base-300 px-10 py-4">
                <aside className="items-center grid-flow-col">
                    <p>
                        © {new Date().getFullYear()} BoiGhor. All rights reserved.
                    </p>
                </aside>


                <nav className="md:place-self-center md:justify-self-end">
                    <div className="grid grid-flow-col gap-4">
                        <a aria-label="Facebook">
                            <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M9 8H6v4h3v12h5V12h3.6l.4-4H14V6.5c0-1 .2-1.5 1.3-1.5H18V0h-3.6C10.8 0 9 1.7 9 4.9V8z" />
                            </svg>
                        </a>

                    </div>
                    <ThemeSwitcher></ThemeSwitcher>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
