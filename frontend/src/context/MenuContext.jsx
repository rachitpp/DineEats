import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getMenuItems } from "../services/api";

// Create context
const MenuContext = createContext();

// Provider component
export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Store categories that we've already fetched
  const [fetchedCategories, setFetchedCategories] = useState(new Set());

  // Fetch menu items when activeCategory changes or on initial load
  const fetchMenuItems = useCallback(
    async (category) => {
      // Skip loading state if we've already fetched this category
      const shouldShowLoading =
        !isInitialized || !fetchedCategories.has(category || "all");

      if (shouldShowLoading) {
        setLoading(true);
      }

      try {
        const data = await getMenuItems(category);
        setMenuItems(data);
        setError(null);
        setIsInitialized(true);

        // Remember that we've fetched this category
        setFetchedCategories((prev) => {
          const newSet = new Set(prev);
          newSet.add(category || "all");
          return newSet;
        });
      } catch (err) {
        setError("Failed to load menu items. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [isInitialized, fetchedCategories]
  );

  useEffect(() => {
    fetchMenuItems(activeCategory);
  }, [activeCategory, fetchMenuItems]);

  // Allow manual refresh of data if needed
  const refreshMenuItems = () => {
    // Clear cached categories when manually refreshing
    setFetchedCategories(new Set());
    fetchMenuItems(activeCategory);
  };

  // Expose functions and state to consumers
  return (
    <MenuContext.Provider
      value={{
        menuItems,
        loading,
        error,
        activeCategory,
        setActiveCategory,
        isInitialized,
        refreshMenuItems,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

// Custom hook to use the menu context
export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
