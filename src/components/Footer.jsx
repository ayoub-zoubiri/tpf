import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-12">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <img src="/logo.png" alt="Toplago" className="h-8 w-8 object-contain bg-white rounded-full p-1" />
                            <span className="text-white text-2xl font-bold">Toplago</span>
                        </div>
                        <p className="text-sm mb-4">Your AI-powered travel companion for planning unforgettable journeys around the world.</p>
                        <div className="flex gap-4">
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition"><i className="fa-brands fa-twitter"></i></a>
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition"><i className="fa-brands fa-instagram"></i></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Product</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/planner" className="hover:text-white">AI Planner</Link></li>
                            <li><a href="#" className="hover:text-white">Activities</a></li>
                            <li><a href="#" className="hover:text-white">Destinations</a></li>
                            <li><a href="#" className="hover:text-white">Pricing</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">About Us</a></li>
                            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                            <li><a href="#" className="hover:text-white">Careers</a></li>
                            <li><a href="#" className="hover:text-white">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Help Center</a></li>
                            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 text-center text-xs">
                    &copy; 2025 Toplago.com. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
