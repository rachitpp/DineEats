import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#f0f7f0] pt-10 pb-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Logo and Description */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h2 className="text-[#27ae60] font-bold text-lg mb-3 tracking-wide">GreenCart</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-1">
              We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="uppercase font-bold text-xs text-gray-700 mb-3 tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-[#27ae60] text-sm">Home</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-[#27ae60] text-sm">Best Sellers</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-[#27ae60] text-sm">Offers & Deals</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-[#27ae60] text-sm">Contact Us</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-[#27ae60] text-sm">FAQs</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="uppercase font-bold text-xs text-gray-700 mb-3 tracking-wider">Need help?</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-[#27ae60] text-sm">Delivery Information</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-[#27ae60] text-sm">Return & Refund Policy</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-[#27ae60] text-sm">Payment Methods</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-[#27ae60] text-sm">Track your Order</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-[#27ae60] text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="w-full md:w-1/4">
            <h3 className="uppercase font-bold text-xs text-gray-700 mb-3 tracking-wider">Follow Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-[#27ae60] text-sm">Instagram</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#27ae60] text-sm">Twitter</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#27ae60] text-sm">Facebook</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#27ae60] text-sm">YouTube</a></li>
            </ul>
          </div>
        </div>
        {/* Divider */}
        <div className="border-t border-gray-200 mt-8 mb-3"></div>
        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-500 text-xs">
            Copyright 2025 &copy; GreatStock.dev All Right Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
