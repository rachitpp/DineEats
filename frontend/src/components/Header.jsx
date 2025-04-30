import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { cart } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = cart.items
    ? cart.items.reduce((total, item) => total + item.quantity, 0)
    : 0;

  return (
    <header className="bg-white border-b border-gray-200 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-900 no-underline hover:no-underline group"
        >
          <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
            🍽️
          </span>
          <div className="flex flex-col">
            <span className="text-[1.75rem] font-extrabold text-gray-900 tracking-wide group-hover:text-[#27ae60] transition-colors duration-300">
              DineEats
            </span>
            <span className="text-xs text-gray-500 -mt-1 hidden sm:block">
              Fresh food delivered
            </span>
          </div>
        </Link>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-4">
          <NavLink
            to="/"
            active={location.pathname === "/" || location.pathname === "/menu"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Menu
          </NavLink>
          <NavLink
            to="/order-history"
            active={location.pathname === "/order-history"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Orders
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          {/* Cart Icon */}
          <Link to="/cart" className="relative ml-1">
            <button className="p-2 rounded-full bg-white hover:bg-[#e8f4e8] hover:text-[#27ae60] hover:shadow-md transition-all duration-300 relative group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[30px] w-[30px] text-gray-800 group-hover:text-[#27ae60]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13a1 1 0 001-1l-1.5-5H7z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#27ae60] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>
            <span className="hidden group-hover:block absolute top-full right-0 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap">
              Your Cart
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 ml-1 rounded-md hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="space-y-1 px-4">
            <MobileNavLink
              to="/"
              active={
                location.pathname === "/" || location.pathname === "/menu"
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Menu
            </MobileNavLink>
            <MobileNavLink
              to="/order-history"
              active={location.pathname === "/order-history"}
              onClick={() => setMobileMenuOpen(false)}
            >
              Order History
            </MobileNavLink>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ to, active, children }) => {
  return (
    <Link
      to={to}
      className={`text-[1rem] font-bold px-4 py-2 rounded-full transition duration-200 no-underline flex items-center
        ${
          active
            ? "bg-[#e8f4e8] text-[#27ae60]"
            : "text-gray-800 hover:text-[#27ae60] hover:bg-[#f0f7f0]"
        }
      `}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ to, active, children, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block text-[1rem] font-bold px-3 py-2 rounded-md transition duration-200 no-underline
        ${
          active
            ? "bg-[#e8f4e8] text-[#27ae60]"
            : "text-gray-800 hover:text-[#27ae60] hover:bg-[#f0f7f0]"
        }
      `}
    >
      {children}
    </Link>
  );
};

export default Header;
