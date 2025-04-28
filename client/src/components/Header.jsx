import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cart } = useCart();
  const location = useLocation();
  
  // Calculate total items in cart
  const totalItems = cart.items ? cart.items.reduce((total, item) => total + item.quantity, 0) : 0;
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🍽️</span>
            <h1 className="text-[#2c3e50] font-bold text-xl">Delicious Eats</h1>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" active={location.pathname === '/'}>
              Home
            </NavLink>
            <NavLink to="/menu" active={location.pathname === '/menu'}>
              Menu
            </NavLink>
            <NavLink to="/order-history" active={location.pathname === '/order-history'}>
              Order History
            </NavLink>
          </nav>
          
          {/* Mobile Menu Button (hidden on desktop) */}
          <button className="md:hidden text-[#2c3e50] hover:text-[#ff6b35]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Cart Button */}
          <Link to="/cart" className="flex items-center gap-2 ml-4 relative">
            <button className="relative p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2c3e50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ff6b35] text-white text-xs font-medium w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </Link>
        </div>
      </div>
      
      {/* Mobile Navigation (hidden on desktop) */}
      <div className="md:hidden hidden">
        <div className="py-2 px-4 bg-gray-50">
          <Link to="/" className="block py-2 text-[#2c3e50] font-medium hover:text-[#ff6b35]">Home</Link>
          <Link to="/menu" className="block py-2 text-[#2c3e50] font-medium hover:text-[#ff6b35]">Menu</Link>
          <Link to="/order-history" className="block py-2 text-[#2c3e50] font-medium hover:text-[#ff6b35]">Order History</Link>
        </div>
      </div>
    </header>
  );
};

// Navigation Link Component
const NavLink = ({ to, active, children }) => {
  return (
    <Link 
      to={to} 
      className={`relative py-1 font-medium transition-colors duration-200 
        ${active 
          ? 'text-[#ff6b35]' 
          : 'text-[#2c3e50] hover:text-[#ff6b35]'
        }
      `}
    >
      {children}
      <span 
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#ff6b35] transform transition-transform duration-300 ${active ? 'scale-x-100' : 'scale-x-0'}`}
      ></span>
    </Link>
  );
};

export default Header;
