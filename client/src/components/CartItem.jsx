import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { addToCart, removeFromCart } = useCart();
  
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 group">
      <div className="flex items-center">
        <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center mr-4 overflow-hidden">
          {item.category === 'Appetizers' && <span className="text-2xl">🥗</span>}
          {item.category === 'Main Course' && <span className="text-2xl">🍔</span>}
          {item.category === 'Desserts' && <span className="text-2xl">🍰</span>}
          {item.category === 'Drinks' && <span className="text-2xl">🥤</span>}
          {!item.category && <span className="text-2xl">🍽️</span>}
        </div>
        
        <div>
          <h3 className="font-bold text-[#2c3e50] group-hover:text-[#ff6b35] transition-colors">{item.name}</h3>
          <p className="text-gray-500 text-sm">${item.price.toFixed(2)} each</p>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="flex items-center border border-gray-200 rounded-lg mr-6">
          <button
            onClick={() => removeFromCart(item)}
            className="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-600 hover:text-[#ff6b35] rounded-l-lg transition-colors"
            aria-label="Decrease quantity"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          
          <span className="w-8 text-center font-medium text-gray-800">{item.quantity}</span>
          
          <button
            onClick={() => addToCart(item)}
            className="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-600 hover:text-[#ff6b35] rounded-r-lg transition-colors"
            aria-label="Increase quantity"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
        
        <span className="font-bold text-[#ff6b35] min-w-[80px] text-right">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
