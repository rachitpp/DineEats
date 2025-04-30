import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const MenuItem = ({ item }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  // Check if the image path exists and is not the default
  const hasCustomImage = item.image && item.image !== "default-food.jpg";

  // Prepend the server URL to the image path if it doesn't already include http
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    return `http://localhost:5000${imagePath}`;
  };

  const handleAddToCart = () => {
    addToCart(item);
    // Create a small visual feedback
    const button = document.activeElement;
    if (button) {
      button.classList.add("animate-pulse");
      setTimeout(() => button.classList.remove("animate-pulse"), 300);
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="h-52 relative overflow-hidden">
        {hasCustomImage ? (
          <img
            src={getImageUrl(item.image)}
            alt={item.name}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
            {item.category === "Appetizers" && (
              <span className="text-6xl mb-2">🥗</span>
            )}
            {item.category === "Main Course" && (
              <span className="text-6xl mb-2">🍔</span>
            )}
            {item.category === "Desserts" && (
              <span className="text-6xl mb-2">🍰</span>
            )}
            {item.category === "Drinks" && (
              <span className="text-6xl mb-2">🥤</span>
            )}
            <span className="text-sm">No Image</span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3 bg-white py-1 px-3 rounded-full text-xs font-medium text-[#2c3e50] shadow-md">
          {item.category}
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 bg-[#27ae60] py-1 px-3 rounded-full text-sm font-bold text-white shadow-md">
          ₹{item.price.toFixed(2)}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-[#2c3e50] mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm h-12 overflow-hidden mb-4 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-md bg-green-100 text-green-800 ${
              isHovered ? "opacity-100" : "opacity-70"
            }`}
          >
            ⭐ Popular Choice
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-[#27ae60] hover:bg-[#219653] text-white font-semibold px-4 py-2 rounded-lg transition-all flex items-center gap-1 shadow-sm hover:shadow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
