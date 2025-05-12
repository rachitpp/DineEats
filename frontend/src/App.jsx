import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import { MenuProvider } from "./context/MenuContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import "./App.css";

function App() {
  return (
    <Router>
      <ToastProvider>
        <CartProvider>
          <MenuProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<MenuPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route
                    path="/order-confirmation"
                    element={<OrderConfirmationPage />}
                  />
                  <Route path="/order-history" element={<OrderHistoryPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </MenuProvider>
        </CartProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
