import React, { useState, useEffect } from "react";
import { getMenuItems } from "../services/api";
import MenuItem from "../components/MenuItem";
import CategoryFilter from "../components/CategoryFilter";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const data = await getMenuItems(activeCategory);
        setMenuItems(data);
        setError(null);
      } catch (err) {
        setError("Failed to load menu items. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [activeCategory]);

  // Filter items based on search term
  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-b from-[#f8f9fa] to-[#edf0f2] min-h-screen py-8 bg-texture">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-10 bg-white rounded-2xl p-10 shadow-sm">
          <div className="inline-flex mb-4">
            <span className="bg-[#27ae60]/10 text-[#27ae60] text-sm font-semibold px-3 py-1 rounded-full">
              Traditional Indian Cuisine
            </span>
          </div>
          <h1 className="text-5xl font-extrabold text-[#1a1a1a] mb-4 tracking-tight">
            Discover Our <span className="text-gradient">Delicious Menu</span>
          </h1>
          <p className="text-gray-700 text-base font-medium max-w-2xl mx-auto leading-relaxed mb-6">
            Explore our delicious selection of dishes, crafted with the finest
            ingredients and served with love. Something special awaits you!
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search for dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#27ae60] shadow-sm"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Content Area */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 mb-4 border-4 border-[#27ae60] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[#2c3e50] font-semibold text-lg">
                Loading delicious food...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-6 rounded-lg text-center max-w-md mx-auto shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="font-semibold text-lg">{error}</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-yellow-50 text-yellow-700 p-6 rounded-lg text-center max-w-md mx-auto shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto mb-4 floating"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="font-semibold text-lg">
              {searchTerm
                ? "No dishes match your search."
                : "No menu items found for this category."}
            </p>
          </div>
        ) : (
          <>
            {/* Results count */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600 font-medium">
                {filteredItems.length} items{" "}
                {activeCategory ? `in ${activeCategory}` : "on the menu"}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>

            {/* Menu grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredItems.map((item, index) => (
                <div
                  key={item._id}
                  className="menu-item-appear"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <MenuItem item={item} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
