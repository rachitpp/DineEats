import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { addToCart, removeFromCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  // Get image URL if it exists
  const getImageUrl = (imagePath) => {
    if (!imagePath || imagePath === "default-food.jpg") return null;
    if (imagePath.startsWith("http")) return imagePath;

    // Get the API URL base from our API configuration
    const apiUrlBase =
      import.meta.env.BACKEND_URL || "https://dineeats.onrender.com";
    return `${apiUrlBase}${imagePath}`;
  };

  const hasImage = item.image && item.image !== "default-food.jpg";
  const imageUrl = getImageUrl(item.image);

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-gray-200 group transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Item Info */}
      <div className="flex items-center mb-4 sm:mb-0">
        <div
          className={`h-20 w-20 rounded-xl bg-gray-100 flex items-center justify-center mr-5 overflow-hidden shadow-sm ${
            isHovered ? "shadow-md" : ""
          } transition-all duration-300`}
        >
          {hasImage ? (
            <img
              src={imageUrl}
              alt={item.name}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            />
          ) : (
            <>
              {item.category === "Appetizers" && (
                <span className="text-4xl">🥗</span>
              )}
              {item.category === "Main Course" && (
                <span className="text-4xl">🍔</span>
              )}
              {item.category === "Desserts" && (
                <span className="text-4xl">🍰</span>
              )}
              {item.category === "Drinks" && (
                <span className="text-4xl">🥤</span>
              )}
              {!item.category && <span className="text-4xl">🍽️</span>}
            </>
          )}
        </div>

        <div>
          <h3
            className={`font-bold text-lg text-[#1a1a1a] ${
              isHovered ? "text-[#27ae60]" : ""
            } transition-colors duration-300`}
          >
            {item.name}
          </h3>
          <p className="text-gray-600 text-sm font-medium">
            ₹{item.price.toFixed(2)} each
          </p>
          <div className="text-xs text-gray-500 mt-1">
            {item.category && (
              <span className="inline-block bg-gray-100 rounded-full px-2 py-0.5">
                {item.category}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quantity & Total */}
      <div className="flex items-center justify-between sm:justify-end">
        {/* Quantity Control */}
        <div
          className={`flex items-center border ${
            isHovered ? "border-[#27ae60]" : "border-gray-300"
          } rounded-lg mr-6 transition-colors duration-300 shadow-sm`}
        >
          <button
            onClick={() => removeFromCart(item)}
            className={`w-9 h-9 flex items-center justify-center ${
              isHovered
                ? "bg-[#f0fff4] text-[#27ae60]"
                : "bg-gray-50 text-gray-700"
            } hover:text-[#27ae60] hover:bg-[#f0fff4] rounded-l-lg transition-all`}
            aria-label="Decrease quantity"
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
                d="M20 12H4"
              />
            </svg>
          </button>

          <span className="w-8 text-center font-bold text-gray-800 text-base">
            {item.quantity}
          </span>

          <button
            onClick={() => addToCart(item)}
            className="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-700 hover:text-[#27ae60] hover:bg-gray-100 rounded-r-lg transition-all"
            aria-label="Increase quantity"
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
                d="M12 6v12m6-6H6"
              />
            </svg>
          </button>
        </div>

        {/* Item Total */}
        <span className="font-bold text-[#27ae60] text-lg min-w-[80px] text-right">
          ₹{(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
