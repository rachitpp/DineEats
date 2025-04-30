import axios from "axios";

const API_URL = "http://localhost:5000/api";

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
