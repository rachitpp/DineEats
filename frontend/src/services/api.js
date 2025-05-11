import axios from "axios";

// Debug: Log environment variable
console.log("BACKEND_URL env variable:", import.meta.env.BACKEND_URL);

// Use environment variable if available, otherwise fallback to defaults
const API_URL =
  (import.meta.env.BACKEND_URL ? `${import.meta.env.BACKEND_URL}/api` : null) ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://dineeats.onrender.com/api");

console.log("Using API URL:", API_URL);

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Menu Items API
export const getMenuItems = async (category = "") => {
  try {
    const url = category ? `/menu-items?category=${category}` : "/menu-items";
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }
};

export const getMenuItemById = async (id) => {
  try {
    const response = await api.get(`/menu-items/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching menu item:", error);
    throw error;
  }
};

// Orders API
export const createOrder = async (orderData) => {
  try {
    const response = await api.post("/orders", orderData);
    return response.data;
  } catch (error) {
    // Check if it's a 503 Service Unavailable error (PostgreSQL not connected)
    if (error.response && error.response.status === 503) {
      console.error(
        "Database service unavailable:",
        error.response.data?.message ||
          "Order functionality is temporarily unavailable"
      );
      throw new Error(
        "Order system is temporarily unavailable. The database might be starting up or under maintenance. Please try again in a few minutes."
      );
    }
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getOrdersByPhone = async (phoneNumber) => {
  try {
    const response = await api.get(`/orders/phone/${phoneNumber}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

export default {
  getMenuItems,
  getMenuItemById,
  createOrder,
  getOrdersByPhone,
  getOrderById,
};
