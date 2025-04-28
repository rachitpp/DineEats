import { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0
};

// Create context
const CartContext = createContext();

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };

        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalAmount: state.totalAmount + action.payload.price
        };
      } else {
        // Add new item with quantity 1
        const newItem = { ...action.payload, quantity: 1 };
        
        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + 1,
          totalAmount: state.totalAmount + action.payload.price
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingItemIndex === -1) return state;

      const existingItem = state.items[existingItemIndex];
      
      if (existingItem.quantity === 1) {
        // Remove the item completely
        return {
          ...state,
          items: state.items.filter(item => item._id !== action.payload._id),
          totalItems: state.totalItems - 1,
          totalAmount: state.totalAmount - existingItem.price
        };
      } else {
        // Decrease quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity - 1
        };
        
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems - 1,
          totalAmount: state.totalAmount - existingItem.price
        };
      }
    }
    
    case 'CLEAR_CART':
      return initialState;
      
    default:
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    // Load cart from localStorage on init
    const localData = localStorage.getItem('cart');
    return localData ? JSON.parse(localData) : initialState;
  });

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  // Add item to cart
  const addToCart = (item) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: item
    });
  };

  // Remove item from cart
  const removeFromCart = (item) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: item
    });
  };

  // Clear cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
