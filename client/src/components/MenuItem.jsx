import React from 'react';
import { useCart } from '../context/CartContext';

const MenuItem = ({ item }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="card card-hover group">
      <div className="h-48 bg-gray-100 relative overflow-hidden">
        {item.image && item.image !== 'default-food.jpg' ? (
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
            {item.category === 'Appetizers' && <span className="text-5xl mb-2">🥗</span>}
            {item.category === 'Main Course' && <span className="text-5xl mb-2">🍔</span>}
            {item.category === 'Desserts' && <span className="text-5xl mb-2">🍰</span>}
            {item.category === 'Drinks' && <span className="text-5xl mb-2">🥤</span>}
            <span className="text-sm">No Image</span>
          </div>
        )}
        
        <div className="absolute top-2 right-2 bg-white py-1 px-3 rounded-full text-xs font-medium text-[#2c3e50] shadow-sm">
          {item.category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-[#2c3e50] mb-1">{item.name}</h3>
        <p className="text-gray-600 text-sm h-12 overflow-hidden mb-3">{item.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-[#ff6b35] font-bold text-lg">${item.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(item)}
            className="btn btn-primary flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
