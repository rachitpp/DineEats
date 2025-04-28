import React, { useState, useEffect } from 'react';
import { getMenuItems } from '../services/api';
import MenuItem from '../components/MenuItem';
import CategoryFilter from '../components/CategoryFilter';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const data = await getMenuItems(activeCategory);
        setMenuItems(data);
        setError(null);
      } catch (err) {
        setError('Failed to load menu items. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [activeCategory]);

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-8">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#2c3e50] mb-3">Our Menu</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Explore our delicious selection of dishes, prepared with the finest ingredients and love.
          </p>
        </div>
        <CategoryFilter 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 mb-2 border-4 border-[#ff6b35] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[#2c3e50] font-medium">Loading delicious food...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-6 rounded-lg text-center max-w-md mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-medium">{error}</p>
          </div>
        ) : menuItems.length === 0 ? (
          <div className="bg-yellow-50 text-yellow-700 p-6 rounded-lg text-center max-w-md mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-medium">No menu items found for this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {menuItems.map((item) => (
              <MenuItem key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
