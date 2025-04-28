# Restaurant Ordering System

A full-stack restaurant ordering system that allows customers to browse a menu, add items to a cart, place pickup orders, and view order history.

## Features

- Browse a categorized food menu (Appetizers, Main Course, Desserts, Drinks)
- Add menu items to cart
- View cart with calculated total price
- Place pickup order with name and phone number
- View order history based on phone number

## Tech Stack

### Frontend
- React (with Vite)
- React Router for navigation
- Context API for global state management (cart)
- Axios for API requests

### Backend
- Node.js with Express.js
- MongoDB for menu items (using Mongoose ODM)
- PostgreSQL for users and orders (using Sequelize ORM)
- RESTful API design

## Project Structure

```
restaurant-ordering-system/
├── client/              # React frontend
│   ├── src/
│   │   ├── assets/      # Static assets
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Global state using Context API
│   │   ├── pages/       # Page components
│   │   └── services/    # API service calls
│   └── ...
│
└── server/              # Express backend
    ├── config/          # Database and other configurations
    ├── controllers/     # Route controllers
    ├── middleware/      # Custom middleware
    ├── models/          # Database models (MongoDB & PostgreSQL)
    └── routes/          # API routes
```

## API Endpoints

### Menu Items
- `GET /api/menu-items` - Get all menu items (with optional category filtering)
- `GET /api/menu-items/:id` - Get a single menu item
- `POST /api/menu-items` - Create a new menu item (admin)
- `PUT /api/menu-items/:id` - Update a menu item (admin)
- `DELETE /api/menu-items/:id` - Delete a menu item (admin)

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/phone/:phoneNumber` - Get orders by phone number
- `PUT /api/orders/:id` - Update order status (admin)

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB
- PostgreSQL

### Backend Setup
1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=<your_mongodb_connection_string>
   POSTGRES_URI=<your_postgres_connection_string>
   JWT_SECRET=<random_string_for_jwt>
   NODE_ENV=development
   ```

4. Start the server:
   ```
   npm start
   ```
   
   For development with auto-reload:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Database Design

### MongoDB (Menu Items)
Flexible schema for menu items with various attributes like name, description, price, category, etc.

### PostgreSQL (Users and Orders)
- **Users**: Store customer information including name and phone number
- **Orders**: Store order details with relationships to users and serialized menu items

## Reasoning Behind Database Choices

- **MongoDB** is used for menu items because:
  - Menu items have flexible attributes and may need different fields for different categories
  - The schema may evolve over time as new item types are added
  - Querying by category and attributes is common and well-served by MongoDB

- **PostgreSQL** is used for users and orders because:
  - Orders have structured data with important relationships
  - Order history needs reliable querying by user information
  - Transactional integrity is important for order creation

## Deployment

- Frontend: Deployed on Netlify
- Backend: Can be deployed on Render, Fly.io, or Heroku

## Future Enhancements

- User authentication for admin features
- Payment integration
- Real-time order status updates
- Email/SMS notifications
- Admin dashboard for managing menu and orders
