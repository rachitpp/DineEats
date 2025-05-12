import React, { useState } from "react";
import MenuItem from "../components/MenuItem";
import CategoryFilter from "../components/CategoryFilter";
import { useMenu } from "../context/MenuContext";

const MenuPage = () => {
  const { menuItems, loading, error, activeCategory, setActiveCategory } =
    useMenu();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter items based on search term
  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Menu
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Discover our delicious dishes prepared with fresh ingredients
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-lg mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              className="w-full p-4 pl-12 pr-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#27ae60] focus:border-transparent shadow-sm transition-all duration-200 focus:outline-none"
              placeholder="Search for a dish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
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
