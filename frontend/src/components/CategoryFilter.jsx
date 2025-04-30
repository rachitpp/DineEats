import React from "react";

const CategoryFilter = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { id: "All", icon: "🍽️", label: "All Items" },
    { id: "Appetizers", icon: "🥗", label: "Appetizers" },
    { id: "Main Course", icon: "🍔", label: "Main Course" },
    { id: "Desserts", icon: "🍰", label: "Desserts" },
    { id: "Drinks", icon: "🥤", label: "Drinks" },
  ];

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#2c3e50]">
        Explore <span className="text-[#27ae60]">Categories</span>
      </h2>

      <div className="overflow-x-auto pb-2">
        <div className="flex justify-center min-w-max space-x-4 px-4">
          {categories.map((category) => {
            const isActive =
              activeCategory === (category.id === "All" ? "" : category.id);

            return (
              <button
                key={category.id}
                onClick={() =>
                  setActiveCategory(category.id === "All" ? "" : category.id)
                }
                className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#27ae60] text-white shadow-md transform hover:scale-105"
                    : "bg-white text-[#2c3e50] border border-gray-200 hover:border-[#27ae60] hover:bg-[#f0fff4] hover:text-[#27ae60] hover:shadow-md"
                }`}
              >
                <span
                  className={`text-xl transition-transform duration-300 ${
                    isActive ? "transform rotate-0" : "group-hover:scale-125"
                  }`}
                >
                  {category.icon}
                </span>
                <span className="font-semibold">{category.label}</span>
                {isActive && (
                  <span className="ml-1 bg-white bg-opacity-20 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
