# DineEats 🍔

I built this food ordering app to make it easy for customers to browse a menu, order food, and track their order history. The project combines a React frontend with a dual-database backend (MongoDB + PostgreSQL).

Check out the live demo: [DineEats on Netlify](https://dineeats.netlify.app)

## What can you do with DineEats?

- Browse food categories (Appetizers, Main Course, Desserts, Drinks)
- Search for specific food items
- Add items to your cart (and change quantities)
- View your total
- Place your order
- Get a nice confirmation page
- Look up your past orders with your phone number

## How I built it

For the frontend, I used:

- React (hooks-based components)
- React Router for navigation
- Context API for the shopping cart
- Some animations with Framer Motion
- Tailwind CSS for styling (saved me tons of time!)
- Axios for API calls

On the backend side:

- Node.js + Express
- MongoDB for storing menu items
- PostgreSQL for user info and orders
- REST API pattern
- CORS for frontend-backend communication

## Project structure

Nothing fancy here, pretty standard organization:

```
DineEats/
├── frontend/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── services/
│
└── server/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    └── routes/
```

## Why I used two databases

This was actually one of the most interesting architecture decisions I made. I went with a dual-database approach:

### MongoDB for menu items

I chose MongoDB for the menu because:

1. Menu items can be pretty flexible - some might have special options, others might have different attributes
2. The document model works well for food items that fit into categories
3. Most of what we do with the menu is read operations, where MongoDB shines
4. It's easy to query by category or filter items
5. When I need to add new menu item types later, I won't need to modify the database schema

Here's what the MongoDB schema looks like in `menuItem.js`:

- name (String)
- description (String)
- price (Number)
- image (String, optional)
- category (String: "Appetizers", "Main Course", "Desserts", "Drinks")
- isAvailable (Boolean)

### PostgreSQL for users and orders

For the user and order data, I went with PostgreSQL because:

1. Orders and users have a clear relationship that benefits from SQL's structure
2. When someone places an order, I need transaction support to make sure everything goes through
3. For order history, I often need to join user data with order details
4. This data is consistent and structured
5. I wanted to prevent problems like negative order totals, which PostgreSQL constraints help with

The Sequelize models in `user.js` and `order.js` define these relationships.

## API endpoints

Here are the main API endpoints I implemented:

### Menu endpoints

- `GET /api/menu-items` - Gets all menu items
  - You can filter with ?category=Desserts (for example)
- `GET /api/menu-items/:id` - Gets one menu item
- `POST /api/menu-items` - Adds a new menu item (admin only)
- `PUT /api/menu-items/:id` - Updates a menu item
- `DELETE /api/menu-items/:id` - Removes a menu item

### Order endpoints

- `POST /api/orders` - Places a new order
- `GET /api/orders/:id` - Gets a specific order
- `GET /api/orders/phone/:phoneNumber` - Gets all orders for a phone number
- `PUT /api/orders/:id` - Updates order status

## How to set it up locally

### What you'll need

- Node.js (v14+)
- npm/yarn
- MongoDB (local or Atlas)
- PostgreSQL

### Getting the backend running

1. Clone the repo

   ```
   git clone https://github.com/yourusername/DineEats.git
   cd DineEats
   ```

2. Install backend dependencies

   ```
   cd server
   npm install
   ```

3. Create a `.env` file with:

   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/dineeats
   POSTGRES_URI=postgres://username:password@localhost:5432/dineeats
   NODE_ENV=development
   ```

   If you're using MongoDB Atlas, paste their connection string instead.

4. Set up your database:

   For MongoDB, just make sure it's running.

   For PostgreSQL, create a database:

   ```
   CREATE DATABASE dineeats;
   ```

   The app will create the tables automatically when it starts.

5. Start the server
   ```
   npm run dev
   ```

### Setting up the frontend

1. Open a new terminal and go to the frontend folder

   ```
   cd ../frontend
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Create a `.env` file with:

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server

   ```
   npm run dev
   ```

5. Open your browser to the URL shown (usually http://localhost:5173)

## Deployment notes

I deployed the frontend on Netlify. If you want to do the same:

1. Build the frontend

   ```
   cd frontend
   npm run build
   ```

2. Upload the `dist` folder to Netlify

3. Add the backend URL in your Netlify environment variables

The backend can go on Render, Fly.io, Heroku, or Railway - just make sure you set up your environment variables there too.

## Testing the API

I used Postman a lot during development. You can also use Insomnia or curl:

```
curl -X GET http://localhost:5000/api/menu-items
```

## What's next?

I have a few ideas for future improvements:

- Adding user logins
- Building an admin dashboard
- Real-time order tracking
- Payment processing
- Email confirmations
- Maybe a mobile app someday

Feel free to contribute if you have ideas!

## License

MIT
