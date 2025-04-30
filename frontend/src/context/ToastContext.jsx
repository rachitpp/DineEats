import React, { createContext, useContext, useState, useCallback } from "react";
import ToastContainer from "../components/ToastContainer";

// Create the context
const ToastContext = createContext();

// Generate unique IDs for toasts
let toastIdCounter = 0;
const getNextId = () => {
  toastIdCounter += 1;
  return toastIdCounter;
};

// Provider component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Add a new toast
  const addToast = useCallback((message, type = "success", duration = 3000) => {
    const id = getNextId();
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }]);
    return id;
  }, []);

  // Remove a toast by ID
  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  // Show a success toast
  const showSuccess = useCallback(
    (message, duration) => {
      return addToast(message, "success", duration);
    },
    [addToast]
  );

  // Show an error toast
  const showError = useCallback(
    (message, duration) => {
      return addToast(message, "error", duration);
    },
    [addToast]
  );

  // Show a warning toast
  const showWarning = useCallback(
    (message, duration) => {
      return addToast(message, "warning", duration);
    },
    [addToast]
  );

  // Show an info toast
  const showInfo = useCallback(
    (message, duration) => {
      return addToast(message, "info", duration);
    },
    [addToast]
  );

  // Context value
  const contextValue = {
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

// Custom hook to use the toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
