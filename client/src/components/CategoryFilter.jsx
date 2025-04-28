import React from 'react';

const CategoryFilter = ({ activeCategory, setActiveCategory }) => {
  const categories = ['All', 'Appetizers', 'Main Course', 'Desserts', 'Drinks'];
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-center text-[#2c3e50]">Explore Categories</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category === 'All' ? '' : category)}
            className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 ${
              (activeCategory === category) || (activeCategory === '' && category === 'All')
                ? 'bg-[#ff6b35] text-white shadow-md transform scale-105'
                : 'bg-white text-[#2c3e50] border border-gray-200 hover:border-[#ff6b35] hover:text-[#ff6b35]'
            }`}
          >
            {category === 'All' && '🍽️ '}
            {category === 'Appetizers' && '🥗 '}
            {category === 'Main Course' && '🍔 '}
            {category === 'Desserts' && '🍰 '}
            {category === 'Drinks' && '🥤 '}
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
